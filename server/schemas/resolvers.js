/**
 * @file resolvers.js
 * Define the query and mutation functionality to work with the Mongoose models
 */

const { User, Session, Post, Comment } = require('../models');
const { signToken, AuthenticationError } = require ('../utils/auth');

const resolvers = {
    Query: {
        // Get the user object for the current auth session
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id});
                return user;
            }
            throw AuthenticationError;
        },

        // Get user object by username and populate the sessions for the user
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('sessions');
        },

        // Get the sessions for the user by username
        sessions: async(parent, { username }) => {
            const params = username ? { username } : {};
            return Session.find(params).sort({start_date: -1});
        },

        // Get the posts for the user by username
        posts: async(parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({created_At: -1});
        },

        // Get the comments for a post by ID 
        comments: async(parent, { post_Id }) => {
            const params = post_Id ? { post_Id } : {};
            return Comment.find(params).sort({created_At: -1});
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
                    sessionInput
                });

                // Update the user's sessions array 
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { sessions: session._id }}
                )
                
                return session;
            }
            throw AuthenticationError;
        },

        removeSession: async (parent, { sessionId }, context) => {
            if (context.user) {
                // Delete and store the deleted document
                const session = await Session.findOneAndDelete({
                    _id: sessionId
                });

                // Update the user's sessions array 
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { sessions: session._id }}
                )

                return session;
            }
            throw AuthenticationError;
        }
    }
};

module.exports = resolvers;
