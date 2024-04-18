const SessionList = ({ sessions, title }) => {
  console.log(sessions);
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
                Hosted By: User {session.host._id}
              </div>
              <div style={{ fontSize: '1.1rem' }}>
                Date: {session.start_date}
              </div>
            </h4>
            <div className="card-body bg-light p-2" id="session-box-description">
              <p>{session.description}</p>
            </div>        
          </div>
        ))}
    </div>
  );
};

export default SessionList;