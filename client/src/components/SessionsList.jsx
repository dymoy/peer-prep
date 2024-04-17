const SessionList = ({ sessions, title }) => {
  console.log(sessions);
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
                Hosted By: User {session.host.username}
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