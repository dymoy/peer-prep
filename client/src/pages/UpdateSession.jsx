import UpdateSessionForm from '../components/UpdateSessionForm';
import { useLocation } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_SESSION } from '../utils/queries';
import dayjs from 'dayjs';

const UpdateSession = () => {
    const { state } = useLocation();
    const sessionId = state.sessionId;

    const { loading, data } = useQuery(QUERY_SINGLE_SESSION, {
        variables: {
            sessionId: sessionId
        }
    });
    const session = data?.singleSession || {};

    if (loading) return null;

    // Format the start date so assign the default value in the UpdateSessionForm
    const startDate = new Date(parseInt(session.start_date));
    const startVal = dayjs(startDate).format('YYYY-MM-DDTHH:mm');

    // Format the end date to assign the default value in the UpdateSessionForm
    const endDate = new Date(parseInt(session.end_date));
    const endVal = dayjs(endDate).format('YYYY-MM-DDTHH:mm');

    // Create the session input object to pass to UpdateSessionForm
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