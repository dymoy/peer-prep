/**
 * @file typeDefs.js 
 * Define necessary Query and Mutation types in gql. 
 */
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User { 
        _id: ID
        username: String!
        email: String!
        sessions: [Session]
        posts: [Post]
        comments: [Comment]
    }

    type Session { 
        _id: ID!
        title: String
        description: String
        unit: String
        start_date: String
        end_date: String
        link: String
        host: User
        attendees: [User]
    }

    type Post {
        _id: ID!
        title: String
        content: String
        topics: String
        author: User
        created_At: String
        solved: Boolean
        comments: [Comment]
    }

    type Comment { 
        _id: ID!
        content: String
        created_At: String
        user: User
        post: Post
    }

    type Auth {
        token: ID! 
        user: User
    }

    input SessionInput {
        _id: ID!
        title: String
        description: String
        unit: String
        start_date: String
        end_date: String
        link: String
        host: User
        attendees: [User]
    }
    
    input PostInput {
        _id: ID!
        title: String
        content: String
        topics: String
        author: User
        created_At: String
        solved: Boolean
        comments: [Comment]
    }
    
    input CommentInput {
        _id: ID!
        content: String
        created_At: String
        user: User
        post: Post
    }
    
    type Query { 
        me: User
        sessions(username: String!): [Session]
        posts(username: String!): [Post]
        comments(_id: ID!): [Comment]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addSession(sessionInput: SessionInput!): Session
        removeSession(sessionId: ID!): Session
        addPost(postInput: PostInput!): Post
        removePost(_id: ID!): Post
        addComment(postId: ID!, commentInput: CommentInput!): Comment
    }
`;

module.exports = typeDefs;
