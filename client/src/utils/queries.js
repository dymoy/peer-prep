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
            sessions {
                title
                description
                unit
                start_date
                end_date
                link
                host
                attendees {
                    username
                }
            }
        }
    }
`;

// TODO: Add posts and comments to query_me? 

// TODO: Add other queries