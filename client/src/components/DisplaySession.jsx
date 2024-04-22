/**
 * @file DisplaySession.jsx
 * React Component to display data of a given Session object
 */

import { useQuery } from '@apollo/client';
import { QUERY_USER} from '../utils/queries';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(CustomParseFormat);

const DisplaySession = ({session}) => {
    
    /* Query user to retrieve username for given ID */
    const getUser = (userId) => {
        const { loading, data } = useQuery(QUERY_USER, {
        variables: {
            userId: userId 
        }
        });
        
        return data?.user.username || '';
    }

    /* Calculate the duration of meeting using start and end times */
    const getDuration = (startTime, endTime) => {
        const startDate = dayjs(startTime, 'MMM Do, YYYY [at] h:mm a');
        const endDate = dayjs(endTime, 'MMM Do, YYYY [at] h:mm a');

        let duration = endDate.diff(startDate, 'hour', true).toPrecision(3);
        let remainder = duration.split('.')[1];

        if (remainder.charAt(0) === '0' && remainder.charAt(1) === '0') {
            duration = duration.split('.')[0];
        } 
        if (duration === 1) {
            return `${duration} hour`;
        } else {
            return `${duration} hours`;
        }
    }

    return (
        <div className='session-box'>
            <h3>{session.title}</h3>
            <h4 className="card-header" id="session-box-subheader">
                <div style={{ fontSize: '1.1rem' }}>
                    <strong>Unit: {session.unit}</strong>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    <strong>Hosted By: { getUser(session.host._id) }</strong>
                </div>
                <div style={{ fontSize: '1.0rem' }}>
                    Starts: {session.start_date}
                </div>
                <div style={{ fontSize: '1.0rem' }}>
                    Duration: { getDuration(session.start_date, session.end_date) }
                </div>
                <div style={{ fontSize: '1.0rem' }}>
                    Session Link: {session.link}
                </div>
            </h4>
            <div className="card-body bg-light" id="session-box-description">
                <p>{session.description}</p>
            </div>
        </div>
    );
};

export default DisplaySession;
