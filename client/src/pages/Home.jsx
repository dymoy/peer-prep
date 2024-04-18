import { useQuery } from '@apollo/client';
import SessionList from "../components/SessionsList";
import { QUERY_ALL_SESSIONS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_SESSIONS);
  const allSessions = data?.allSessions || [];
  console.log(data);
  return (
    <main>
      <div id="welcome-section">
        <p>
        Welcome your one stop shop to collaborate with others on topics you are
        studying! Access the Study-Sessions section to collaborate
        with others via virtual meetings. To take the full advantage of this
        site, please sign up for an account or login. 
        <br></br><br></br>
        Find available study sessions below:
        </p>
      </div>
  
      <div id="sessions-list" className="col-12 col-md-8 mb-3">
      
        {loading ? (
            <div>Loading...</div>
          ) : (
        
            <SessionList
              sessions={data.allSessions}
              title="Study Session"
            />
          )}
        
      </div>

    </main>
  );
};

export default Home;
