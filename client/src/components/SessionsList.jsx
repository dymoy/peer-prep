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
              {session.host} <br />
              <span style={{ fontSize: '1rem' }}>
                is hosting this session on {session.start_date}
              </span>
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