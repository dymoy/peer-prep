/**
 * @file resolvers.js
 * Define the query and mutation functionality to work with the Mongoose models
 */

const { User, Session} = require('../models');
const { signToken, AuthenticationError } = require ('../utils/auth');

const resolvers = {
    Query: {
        // Get the user object for the current auth session
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id})
                return user;
            }
            throw AuthenticationError;
        },

        user: async (parent, { id }) => {
            return await User.findOne({ _id: id });
        },

        // Get all sessions from the database 
        allSessions: async (parent, args) => {
            return Session.find().sort({ start_date: 1});
        },

        // Get the sessions for the user by username
        mySessions: async(parent, args, context) => {
            const sessions = await Session.find({ 
                $or: [
                    { host: context.user._id },
                    { attendees: context.user._id }
                ],
                start_date: {
                    $gte: Date.now()
                }
            }).sort({ start_date: 1 });
            
            return sessions;
        },

        // Get a single session by sessionId
        singleSession: async(parent, { sessionId }) => {
            const session = await Session.findOne({ _id: sessionId }).lean();

            return session;
        }
    }, 

    Mutation: {
        login: async (parent, { email, password }) => {
            // Check if the email exists in the database 
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            // Validate that the password is correct 
            const isPwCorrect = await user.isCorrectPassword(password);

            if (!isPwCorrect) {
                throw AuthenticationError;
            }

            // Return token and user 
            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            // Create the user instance and return it with token 
            const user = await User.create(
                {
                    username: username,
                    email: email,
                    password: password,
                }
            );

            const token = signToken(user);
            return { token, user };
        },

        addSession: async (parent, { sessionInput }, context) => {
            // Check that the user is authenticated
            if (context.user) {
                // Create the session document
                const session = await Session.create({
                    ...sessionInput
                });

                // Update the user's sessions array 
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { sessions: session._id }}
                );
                
                return session;
            }
            throw AuthenticationError;
        },

        updateSession: async (parent, { sessionInput }, context) => {
            if (context.user) {
                const session = await Session.findOneAndUpdate(
                    { _id: sessionInput._id},
                    { ...sessionInput },
                    { new: true }
                );
    
                return session;
            }
            throw new AuthenticationError;
        },

        deleteSession: async (parent, { sessionId }, context) => {
            if (context.user) {
                // Delete the session document from the db 
                const session = await Session.findOneAndDelete(
                    { _id: sessionId }
                );
    
                // Remove the session from the user's array of sessions 
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { sessions: sessionId }},
                );
    
                // Remove the session from all attendee's array of sessions 
                const { attendees } = session;
                if(attendees.length) {
                    attendees.map(async (attendeeId) => {
                        await User.findOneAndUpdate(
                            { _id: attendeeId },
                            { $pull: { sessions: sessionId }}
                        );
                    });
                }
    
                return session;
            }
            throw new AuthenticationError;
        },

        addAttendee: async (parent, { sessionId }, context) => {
            if (context.user) {
                // Add context user Id to the session attendees array
                const session = await Session.findOneAndUpdate(
                    { _id: sessionId },
                    { $push: { attendees: context.user._id }},
                    { new: true}
                )

                // Add sessionId to the attendee's sessions array 
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { sessions: sessionId }},
                    { new: true }
                );

                return session;
            }
            throw AuthenticationError;
        },

        removeAttendee: async (parent, { sessionId }, context) => {
            if (context.user) {
                // Remove context user Id to the session attendees array
                const session = await Session.findOneAndUpdate(
                    { _id: sessionId },
                    { $pull: { attendees: context.user._id }},
                    { new: true}
                )

                // Remove session Id from the user's session array 
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { sessions: sessionId }},
                    { new: true }
                )
                
                return session;
            }
            throw AuthenticationError;
        },
    }
};

module.exports = resolvers;
