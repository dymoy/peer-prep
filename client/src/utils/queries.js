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
        }
    }
`;

export const QUERY_USER = gql`
    query user($userId: ID!) {
        user(id: $userId) {
            username
            sessions {
                _id
            }
        }
    }
`;

export const QUERY_ALL_SESSIONS = gql`
    query AllSessions {
        allSessions {
            _id
            title
            description
            unit
            start_date
            end_date
            link
            host {
                _id
            }
            attendees {
                _id
            }
        }
    }
`;

export const QUERY_MY_SESSIONS = gql`
    query mySessions {
        mySessions {
            _id
            title
            description
            unit
            start_date
            end_date
            link
            host {
                _id
            }
            attendees {
                _id
            }
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