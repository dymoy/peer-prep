import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';

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

  // Adds the current auth user to the attendees array of the selected Session
  const registerAttendee = () => {
    console.log(Auth.getProfile().data);
    // TODO: Call mutation to addAttendee 
    return;
  }

  // If no sessions exist in the database, notify the user 
  if (!sessions.length) {
    return <h3>No sessions Yet</h3>;
  }

  return (
    <div id="session-box">
      {sessions &&
        sessions.map((session) => (
          <div key={session._id} className="card mb-3">
            <h3>{session.title}</h3>
            <h4 className="card-header p-2 m-0"  id="session-box-subheader">
              <div style={{ fontSize: '1.1rem' }}>
                Unit: {session.unit}
              </div>
              <div style={{ fontSize: '1.1rem' }}>
                Hosted By: { getUser(session.host._id) }
              </div>
              <div style={{ fontSize: '1.1rem' }}>
                Date: {session.start_date}
              </div>
            </h4>
            <div className="card-body bg-light p-2" id="session-box-description">
              <p>{session.description}</p>
            </div>
            { Auth.loggedIn() && Auth.getProfile().data.username !== getUser(session.host._id) &&
              <button className="btn btn-primary btn-block py-3" type="submit" onClick={ registerAttendee }>Register to Session!</button>
            }
          </div>
        ))}
    </div>
  );
};

export default SessionList;
