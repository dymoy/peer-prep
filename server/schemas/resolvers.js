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
            return Session.find().sort({ start_date: -1 });
        },

        // Get the sessions for the user by username
        mySessions: async(parent, args, context) => {
            const sessions = await Session.find({ 
                host: context.user._id,
                start_date: {
                    $gte: Date.now()
                }
            });
            console.log(sessions);
            
            return sessions;
        },

        // Get a single session by sessionId
        singleSession: async(parent, { sessionId }) => {
            return Session.findOne({ _id: sessionId });
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
            console.log("entered addSession resolvers");
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

        removeSession: async (parent, { sessionId }, context) => {
            if (context.user) {
                // Delete and store the requested session document
                const session = await Session.findOneAndDelete({
                    _id: sessionId
                });

                // Update the user's sessions array 
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { sessions: session._id }}
                );

                return session;
            }
            throw AuthenticationError;
        }, 

        addPost: async (parent, { postInput }, context) => {
            if (context.user) {
                // Create the post document 
                const post = await Post.create({
                    postInput
                });

                // Update the user's post array 
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { posts: post._id }}
                ); 

                return post;
            }
            throw AuthenticationError;
        },

        removePost: async (parent, { postId }, context) => {
            if (context.user) {
                // Delete and store the requested post document
                const post = await Post.findOneAndDelete({
                    _id: postId
                });

                // Update the user's posts array 
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { posts: post._id }}
                );

                return post;
            }
            throw AuthenticationError
        },

        addComment: async (parent, { postId, commentInput }, context) => {
            if (context.user) {
                // Create the comment document
                const comment = await Comment.create({
                    commentInput
                });

                // Update the user's comment array 
                await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { comments: comment._id }}
                );

                // Update the post's comment array 
                await Post.findOneAndUpdate(
                    { _id: postId },
                    { $addToSet: { comments: comment._id }}
                );

                return comment;
            }
            throw AuthenticationError;
        }
    }
};

module.exports = resolvers;
