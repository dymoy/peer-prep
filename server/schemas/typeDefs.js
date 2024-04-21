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

    input SessionInput {
        _id: ID
        title: String
        description: String
        unit: String
        start_date: String
        end_date: String
        link: String
        host: ID
        attendees: [String]
    }
    
    type Auth {
        token: ID! 
        user: User
    }

    type Query { 
        me: User
        user(id: ID!): User
        allSessions: [Session]
        mySessions: [Session]
        singleSession(sessionId: ID!): Session
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addSession(sessionInput: SessionInput!): Session
        updateSession(sessionInput: SessionInput!): Session
        deleteSession(sessionId: ID!): Session
        addAttendee(sessionId: ID!): Session
        removeAttendee(sessionId: ID!): Session
    }
`;

module.exports = typeDefs;
