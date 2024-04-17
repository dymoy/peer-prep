import { Link } from 'react-router-dom';

const SessionList = ({ sessions, title }) => {
  if (!sessions.length) {
    return <h3>No sessions Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {sessions &&
        sessions.map((session) => (
          <div key={session._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {session.sessionHost} <br />
              <span style={{ fontSize: '1rem' }}>
                is hosting this session on {session.start_date}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{session.sessionText}</p>
            </div>
            {/* Create a link to this session's page to view its comments using `<Link>` component */}
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/sessions/${session._id}`}
            >
              Join the discussion on this session.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SessionList;