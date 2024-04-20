import { useQuery } from '@apollo/client';
import SessionList from "../components/SessionsList";
import { QUERY_ALL_SESSIONS, QUERY_MY_SESSIONS } from '../utils/queries';
import { Link } from 'react-router-dom';

const MySessions = () => {
    const {loading, data } = useQuery(QUERY_MY_SESSIONS);
    const mySessions = data?.mySessions || [];

    return (
        <main>
            {/* Give user a button option to create a session */}
            <Link to="/addsession" className="btn btn-primary" style={{ backgroundColor: '#d6d4c7', color: '#9d4836', margin: '40px 40px', fontWeight: 'bold' }}>+ Add Session</Link>

            {/* Load the user's saved sessions */}
            {loading 
                ? ( <div>Loading...</div>)
                : (
                    <SessionList
                        sessions={ mySessions }
                    />
                )
            }
        </main>
    );
};

export default MySessions;
