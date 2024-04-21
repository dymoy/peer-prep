/**
 * @file MySessions.jsx
 * React page that queries and renders the existing Sessions for the active user
 */

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MY_SESSIONS, QUERY_ALL_SESSIONS } from '../utils/queries';
import { REMOVE_ATTENDEE, DELETE_SESSION } from '../utils/mutations';
import DisplaySession from "../components/DisplaySession";
import Auth from '../utils/auth';

const MySessions = () => {
    const { loading, data } = useQuery(QUERY_MY_SESSIONS);
    const mySessions = data?.mySessions || [];
    const { allLoading, allData } = useQuery(QUERY_ALL_SESSIONS);
	const allSessions = allData?.allSessions || [];
    const navigate = useNavigate();

	const [removeAttendee, { removeAttendeeError }] = useMutation(REMOVE_ATTENDEE, {
		refetchQueries: [
			QUERY_MY_SESSIONS,
            QUERY_ALL_SESSIONS
		]
	});

    const [deleteSession, {deleteSessionError}] = useMutation(DELETE_SESSION, {
        refetchQueries: [
          QUERY_MY_SESSIONS,
          QUERY_ALL_SESSIONS
        ]
    });

    /* Determine if the active user is already registered to the session in question */
	const isAttending = (attendees) => {
		// For each attendee in the Session.attendee array
		attendees.forEach((attendee) => {
			// Check if the current active user is already in the array
			if (attendee._id == Auth.getProfile().data._id) {
				return true;
			}
		});

		return false;
	}
    
    /* Handle removeAttendee mutation event to remove the active user from the Session.attendee array */
	const handleRemoveAttendee = async (sessionId) => {
		try {
			const { data } = await removeAttendee({
				variables: { sessionId: sessionId }
			});

			if (removeAttendeeError) {
				throw new Error(`Failed to remove attendee from the session ${sessionId}.`);
			}
		} catch (err){
			console.log(err);
		}    
	}

    /* Navigate user to UpdateSession page with the sessionId to update */
    const handleUpdateSession = async (id) => {
        try {
          navigate('/updatesession', { state: { sessionId: id } });
        } catch (err) {
          console.error(err);
        }
    }
   
    /* Handle deleteSession mutation event to delete the Session from the database */
    const handleDeleteSession = async (sessionId) => {
        try {
          const { data } = await deleteSession({
            variables: { sessionId: sessionId }
          });
    
          if (deleteSessionError) {
            throw new Error(`Failed to delete session (id: ${sessionId} from the database.`);
          }
        } catch (err) {
          console.error(err);
        }
    }

    return (
        <main>
            {/* Give user a button option to create a session */}
            <Link to="/addsession" className="btn btn-primary" style={{ backgroundColor: '#d6d4c7', color: '#9d4836', margin: '40px 40px', fontWeight: 'bold' }}>+ Add Session</Link>

			{/* Check if any sessions exist in the database by checking query results */}
			{ !mySessions.length 
				? (
                    <h3 className="no-sessions text-center">
                        No sessions yet :/ 
                        <br /><br />
                        Click on the Add Session button to create and host your first session!
                    </h3> 
                ) : ( <>
                    {/* Load the user's saved sessions */}
                    { loading 
                        ? ( <div>Loading...</div> )
                        : ( 
                            <div className="session-list d-flex justify-content-center"> 
                                <div id="session-box">
                                    {/* Render each session using DisplaySession component */}
                                    { mySessions && mySessions.map((session) => {
                                        return (
                                            <div key={session._id} className="card">
                                                <DisplaySession session={session} />
                                                { Auth.loggedIn() && ( Auth.getProfile().data._id !== session.host._id ) && (isAttending(session.attendees)) && 
                                                    // Render an unregister button if the user is already attending the session 
                                                    <div className='d-flex justify-content-evenly'>
                                                        <button className="btn btn-primary btn-block m-2 py-3 col-md-5" style={{"background": "#769795"}} onClick={ () => handleRemoveAttendee(session._id) }>Unregister</button>
                                                    </div>
                                                }
                                                { Auth.loggedIn() && ( Auth.getProfile().data._id == session.host._id ) && (window.location.pathname === '/mysessions') && 
                                                    // Render an update session button if the user is on the /mysessions page and is the host of the session
                                                    <div className='d-flex justify-content-evenly'>
                                                        <button className="btn btn-primary btn-block m-2 py-3 col-md-5" style={{"background": "#769795"}} type="submit" onClick={ () => handleUpdateSession(session._id) }>Update Session</button>
                                                        <button className="btn btn-primary btn-block m-2 py-3 col-md-5" style={{"background": "#769795"}} type="submit" onClick={ () => handleDeleteSession(session._id) }>Delete Session</button>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }
                </>)
            }
        </main> 
    );
};

export default MySessions;
