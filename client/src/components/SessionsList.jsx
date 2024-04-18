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
    <div>
      {sessions &&
        sessions.map((session) => (
          <div key={session._id} className="card mb-3">
            <h3>{session.title}</h3>
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <div style={{ fontSize: '1rem' }}>
                Unit: {session.unit}
              </div>
              <div style={{ fontSize: '1rem' }}>
                Hosted By: { getUser(session.host._id) }
              </div>
              <div style={{ fontSize: '1rem' }}>
                Date: {session.start_date}
              </div>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{session.description}</p>
            </div>        
          </div>
        ))}
    </div>
  );
};

export default SessionList;
