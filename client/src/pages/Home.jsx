import React from "react";
import SessionList from "../components/SessionsList";
import { QUERY_ALL_SESSIONS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_SESSIONS);
  const sessions = data?.sessions || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <h2>Welcome to Peer Prep</h2>
        <p>
        Your one stop shop to collaborate with others on topics you are
        studying. Access the Study-Sessions section to collaborate
        with others via virtual meetings. To take the full advantage of this
        site, please sign up for an account or login.
        </p>
      </div>
      <div className="col-12 col-md-8 mb-3">
        {loading ? (
            <div>Loading...</div>
          ) : (
            <SessionList
              sessions={sessions}
              title="Upcoming Sessions"
            />
          )}
      </div>
    </main>
  );
};

export default Home;
