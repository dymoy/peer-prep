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
    mutation addSession($sessionInput: SessionInput!) {
            addSession(sessionInput: $sessionInput) {
            _id
            title
            host {
                _id
            }
        }
    }
`;

export const UPDATE_SESSION = gql`
    mutation updateSession($sessionInput: SessionInput!) {
        updateSession(sessionInput: $sessionInput) {
            _id
            title
            host {
                _id
            }
        }
    }
`;

export const DELETE_SESSION = gql`
    mutation deleteSession($sessionId: ID!) {
        deleteSession(sessionId: $sessionId) {
            title
            description
            unit
            start_date
            end_date
            host {
                _id
            }
            attendees {
                _id
            }
            link
        }
    }
`;

export const ADD_ATTENDEE = gql`
    mutation addAttendee($sessionId: ID!) {
        addAttendee(sessionId: $sessionId) {
            _id
            host {
                _id
            }
            attendees {
                _id
            }
        }
    }
`;

export const REMOVE_ATTENDEE = gql`
    mutation removeAttendee($sessionId: ID!) {
        removeAttendee(sessionId: $sessionId) {
            _id
            host {
                _id
            }
            attendees {
                _id
            }
        }
    }
`;

