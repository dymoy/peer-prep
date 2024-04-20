import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER} from '../utils/queries';
import { ADD_ATTENDEE, REMOVE_ATTENDEE } from '../utils/mutations';
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

  // Helper function to determine if the active user is already registered to the session in question
  const isAttending = (attendees) => {
    var attending = false;

    attendees.forEach((attendee) => {
      if (attendee._id == Auth.getProfile().data._id) {
        attending = true;
      }
    });

    return attending;
  }
  
  // Adds the current auth user to the attendees array of the selected Session
  const [addAttendee, { addAttendeeError }] = useMutation(ADD_ATTENDEE);

  const handleAddAttendee = async (sessionId) => {
    try {
      const { data } = await addAttendee({
        variables: { sessionId: sessionId }
      });
  
      if (addAttendeeError) { 
        throw new Error(`Failed to add attendee to session ${sessionId}.`);
      }

    } catch (err) {
      console.error(err);
    }
  }

  // Removes the current auth user from the attendees array of the selected Session
  const [removeAttendee, { removeAttendeeError }] = useMutation(REMOVE_ATTENDEE);
  
  const handleRemoveAttendee = async (sessionId) => {
    try {
        const { data } = await removeAttendee({
          variables: { sessionId: sessionId }
        });

        if (removeAttendeeError) {
          throw new Error(`Failed to remove attendee from the session ${sessionId}.`);
        }

    } catch (err){
      console.log(err);
    }    
  }

  //
  const navigate = useNavigate();

  const handleUpdateSession = async (id) => {
    try {
      navigate('/updatesession', { state: { sessionId: id } });
    } catch (err) {
      console.error(err);
    }
  }

  //
  const handleDeleteSession = async (id) => {
    try {
      console.log('entered handleDeleteSesion');

    } catch (err) {
      console.error(err);
    }
  }
  
  // Get duration of meeting using start and end times
  // TODO: Debug - precision giving error
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
            <div className='d-flex justify-content-center'>
              { Auth.loggedIn() && ( Auth.getProfile().data._id !== session.host._id ) && (!isAttending(session.attendees)) && 
                // Render a register button if the user is not already attending the session
                <button className="btn btn-primary btn-block m-2 py-3 col-md-5" style={{"background": "#769795"}} onClick={ () => handleAddAttendee(session._id) }>Register</button>
              }
              { Auth.loggedIn() && ( Auth.getProfile().data._id !== session.host._id ) && (isAttending(session.attendees)) && 
                // Render an unregister button if the user is already attending the session 
                <button className="btn btn-primary btn-block m-2 py-3 col-md-5" style={{"background": "#769795"}} onClick={ () => handleRemoveAttendee(session._id) }>Unregister</button>
              }
            </div>

            {
              Auth.loggedIn() && ( Auth.getProfile().data._id == session.host._id ) && (window.location.pathname === '/mysessions') && 
              
              // Render an update session button if the user is on the /mysessions page and is the host of the session
              
              <div className='d-flex justify-content-evenly'>
                <button className="btn btn-primary btn-block m-2 py-3 col-md-5" style={{"background": "#769795"}} type="submit" onClick={ () => handleUpdateSession(session._id) }>Update Session</button>
                <button className="btn btn-primary btn-block m-2 py-3 col-md-5" style={{"background": "#769795"}} type="submit" onClick={ () => handleDeleteSession(session._id) }>Delete Session</button>
              </div>
            }
          </div>
        ))}
    </div>
  );
};

export default SessionList;
