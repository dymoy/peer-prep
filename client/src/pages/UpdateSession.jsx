/**
 * @file UpdateSession.jsx
 * React page that serves the UpdateSessionForm Component for the User to update an existing Session
 */

import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_SESSION } from '../utils/queries';
import UpdateSessionForm from '../components/UpdateSessionForm';
import dayjs from 'dayjs';

const UpdateSession = () => {
    /* Retrieve the sessionId from location state */
    const { state } = useLocation();
    const sessionId = state.sessionId;

    const { loading, data } = useQuery(QUERY_SINGLE_SESSION, {
        variables: {
            sessionId: sessionId
        }
    });
    const session = data?.singleSession || {};

    if (loading) return null;

    /* Format the start_date value to set the default value of the datetime-local input field */
    const startDate = new Date(parseInt(session.start_date));
    const startVal = dayjs(startDate).format('YYYY-MM-DDTHH:mm');

    /* Format the end_date value to set the default value of the datetime-local input field */
    const endDate = new Date(parseInt(session.end_date));
    const endVal = dayjs(endDate).format('YYYY-MM-DDTHH:mm');

    /* Create the sessionInput variable to pass to the updateSession mutation */
    const formattedSession = {
        _id: sessionId,
        title: session.title,
        unit: session.unit,
        description: session.description,
        start_date: startVal,
        end_date: endVal, 
        link: session.link
    }

    return (
        <UpdateSessionForm session={ formattedSession }/>
    )
};

export default UpdateSession;
