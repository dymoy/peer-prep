import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_ATTENDEE } from '../utils/mutations';
import Auth from '../utils/auth';

import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(CustomParseFormat);

const SessionList = ({ sessions }) => {
  
  // query user to retrieve username for given ID
  const getUser = (userId) => {
    const { loading, data } = useQuery(QUERY_USER, {
      variables: {
        userId: userId 
      }
    });
    
    return data?.user.username || '';
  }
  
  const [addAttendee, { error }] = useMutation(ADD_ATTENDEE);

  // Adds the current auth user to the attendees array of the selected Session
  const handleAddAttendee = async (sessionId) => {
    // TODO: Call mutation to addAttendee 

    console.log('Registering attendee..');
    console.log(sessionId);

    try {
      const { data } = await addAttendee({
        variables: { sessionId: sessionId }
      });
  
      if (error) { 
        throw new Error(`Failed to add attendee to session ${sessionId}.`);
      }

    } catch (err) {
      console.error(err);
    }
    
    return;
  }
  
  // Get duration of meeting using start and end times
  const getDuration = (startTime, endTime) => {
    
    const startDate = dayjs(startTime, 'MMM Do, YYYY [at] h:mm a');
    const endDate = dayjs(endTime, 'MMM Do, YYYY [at] h:mm a');

    let duration = endDate.diff(startDate, 'hour', true).toPrecision(3);
    let remainder = duration.split('.')[1];
    console.log(remainder.charAt(0));

    if (remainder.charAt(0) === '0' && remainder.charAt(1) === '0') {
      duration = duration.split('.')[0];
    } 
    if (duration === 1) {
      return `${duration} hour`;
    } else {
      return `${duration} hours`;
    }
  }

  // If no sessions exist in the database, notify the user 
  if (!sessions.length) {
    return <h3 className="no-sessions">No sessions Yet</h3>;
  }

  return (
    <div id="session-box">
      {sessions &&
        sessions.map((session) => (
          <div key={session._id} className="card">
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
            { Auth.loggedIn() && Auth.getProfile().data.username !== getUser(session.host._id) &&
              <button className="btn btn-primary btn-block py-3" type="submit" onClick={ () => handleAddAttendee(session._id) }>Register to Session!</button>
            }
          </div>
        ))}
    </div>
  );
};

export default SessionList;
