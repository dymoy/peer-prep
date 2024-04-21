/**
 * @file resolvers.js
 * Define the query and mutation functionality to work with the Mongoose models
 */

const { User, Session} = require('../models');
const { signToken, AuthenticationError } = require ('../utils/auth');

const resolvers = {
    Query: {
        /* Get the user object for the current active User */
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id})
                return user;
            }
            throw AuthenticationError;
        },

        /* Get the user object by Id */
        user: async (parent, { id }) => {
            const user = User.findOne({ _id: id });
            return user;
        },

        /* Get all existing sessions from the database and sort ascending */
        allSessions: async (parent, args) => {
            const sessions = await Session.find({
                end_date: {
                    $gte: Date.now()
                }
            }).sort({ start_date: 1 });

            return sessions;
        },

        /* Get all existing sessions for the user  */
        mySessions: async(parent, args, context) => {
            if (context.user) {
                const sessions = await Session.find({ 
                    // Check if the user is found in each session's host and attendee field 
                    // TODO: 'in' needed? 
                    $or: [
                        { host: context.user._id },
                        { attendees: context.user._id }
                    ],
                    end_date: {
                        $gte: Date.now()
                    }
                }).sort({ start_date: 1 });
                
                console.log(sessions);
                return sessions;
            }
            throw new AuthenticationError;
        },

        /* Get a single session by sessionId */
        singleSession: async(parent, { sessionId }) => {
            const session = await Session.findOne({ _id: sessionId }).lean();

            return session;
        }
    }, 

    Mutation: {
        /* Validate the user data and return a token with the user object */
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

        /*  Create the User object and return it with a token */
        addUser: async (parent, { username, email, password }) => {
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

        /*  Create the Session, update the User's sessions array, and return the new Session */
        addSession: async (parent, { sessionInput }, context) => {
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

        /* Find the Session by Id and update the contents  */
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

        /* Find and delete the Session by Id, update the active User's session array, and update all attendee Users' session array */
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

        /* Find the Session by Id and add the active User to the attendees array */
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

        /* Find the Session by Id and remove the active User from the attendees array */
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
