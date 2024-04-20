/**
 * @file mutations.js
 * This holds the GraphQL queries that will execute the mutations set up using Apollo Server
 */

import { gql } from "@apollo/client";

/**
 * @mutation LOGIN_USER
 * Executes the loginUser mutation set up using Apollo Server 
 * Returns an Auth type with a JWT and User 
 */
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

/**
 * @mutation ADD_USER
 * Executes the addUser mutation 
 * Returns an Auth type with a JWT and User  
 */
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

/**
 * @mutation ADD_SESSION
 * Executes the addSession mutation 
 * Returns a Session
 */
export const ADD_SESSION = gql`
    mutation ADD_SESSION($sessionInput: SessionInput!) {
            addSession(sessionInput: $sessionInput) {
            _id
            title
            host {
                _id
            }
        }
    }
`;

export const ADD_ATTENDEE = gql`
    mutation Mutation($sessionId: ID!) {
            addAttendee(sessionId: $sessionId) {
            _id
            title
            host {
                username
            }
            attendees {
                username
            }
        }
    }
`;

// /**
//  * @mutation REMOVE_SESSION
//  * Executes the removeSession mutation 
//  * Returns a Session 
//  */
// export const REMOVE_SESSION = gql`
//     mutation removeSession($sessionId: ID!) {
//         removeSession(sessionId: $sessionId) {
//             _id: ID!
//             title: String
//             description: String
//             unit: String
//             start_date: String
//             end_date: String
//             link: String
//             host: User
//             attendees: [User]
//         }
//     }
// `;
