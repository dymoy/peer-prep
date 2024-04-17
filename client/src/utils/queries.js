/**
 * @file queries.js
 * This file holds the queries to execute using Apollo Server 
 */

import { gql } from '@apollo/client';

/**
 * @query QUERY_ME
 * Executes the me query set up using Apollo Server 
 * Returns a User 
 */
export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            sessions 
            posts
            comments
        }
    }
`;

export const QUERY_ALL_SESSIONS = gql`
    query allSessions {
        allSessions {
            _id
            title
            description
            unit
            start_date
            end_date
            host {
                username
            }
            attendees {
                _id
                username
            }
            link
        }
    }
`;

export const QUERY_MY_SESSIONS = gql`
    query mySessions($username: String!) {
        mySessions(username: $username) {
            _id
            title
            description
            unit
            start_date
            end_date
            host {
                username
            }
            attendees {
                username
            }
            link
        }
    }
`;

export const QUERY_SINGLE_SESSION = gql`
    query SingleSession($sesionId: ID!) {
        singleSession(sesionId: $sesionId) {
            _id
            title
            description
            unit
            start_date
            end_date
            host {
                username
            }
            attendees {
                username
            }
            link
        }
    }
`;