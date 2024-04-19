import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

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

  // If no sessions exist in the database, notify the user 
  if (!sessions.length) {
    return <h3>No sessions Yet</h3>;
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
                Ends: {session.end_date}
              </div>
              <div style={{ fontSize: '1.0rem' }}>
                Session Link: {session.link}
              </div>
            </h4>
            <div className="card-body bg-light" id="session-box-description">
              <p>{session.description}</p>
            </div>        
          </div>
        ))}
    </div>
  );
};

export default SessionList;
