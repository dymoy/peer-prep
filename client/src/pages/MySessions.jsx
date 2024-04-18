import { useQuery } from '@apollo/client';
import SessionList from "../components/SessionsList";
import { QUERY_MY_SESSIONS } from '../utils/queries';
import { Link } from 'react-router-dom';

const MySessions = () => {
    const {loading, data } = useQuery(QUERY_MY_SESSIONS);
    const mySessions = data?.mySessions || [];

    return (
        <div className="col-12 col-md-8 mb-3">
            {/* Give user a button option to create a session */}
            <Link to="/addsession" className="btn btn-primary">+ Add Session</Link>

            {/* Load the user's saved sessions */}
            {loading 
                ? ( <div>Loading...</div>)
                : (
                    <SessionList
                        sessions={ mySessions }
                    />
                )
            }
        </div>
    );
};

export default MySessions;
