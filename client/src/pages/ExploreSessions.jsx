/**
 * @file ExploreSessions.jsx 
 * React page that queries and renders all the existing Sessions 
 */
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_SESSIONS, QUERY_MY_SESSIONS } from '../utils/queries';
import { ADD_ATTENDEE, REMOVE_ATTENDEE } from '../utils/mutations';
import DisplaySession from '../components/DisplaySession';
import Auth from '../utils/auth';

const ExploreSessions = () => {
	const { loading, data } = useQuery(QUERY_ALL_SESSIONS);
	const allSessions = data?.allSessions || [];
	const { myLoading, myData } = useQuery(QUERY_MY_SESSIONS);
	const mySessions = myData?.mySessions || [];

	const [addAttendee, { addAttendeeError }] = useMutation(ADD_ATTENDEE, {
		refetchQueries: [
			QUERY_MY_SESSIONS,
			QUERY_ALL_SESSIONS
		]
	});

	const [removeAttendee, { removeAttendeeError }] = useMutation(REMOVE_ATTENDEE, {
		refetchQueries: [
			QUERY_MY_SESSIONS,
			QUERY_ALL_SESSIONS
		]
	});

	/* Determine if the active user is already registered to the session in question */
	const isAttending = (attendees) => {
		var attending = false;

		// For each attendee in the Session.attendee array
		attendees.forEach((attendee) => {
			// Check if the current active user is already in the array
			if (attendee._id == Auth.getProfile().data._id) {
				attending = true;
			}
		});

		return attending;
	}

	/* Handle addAttendee mutation event to register the active user to the Session.attendee array */
	const handleAddAttendee = async (sessionId) => {
		try {
			const { data } = await addAttendee({
				variables: { sessionId: sessionId }
			});
		
			if (addAttendeeError) { 
				throw new Error(`Failed to add attendee to session ${sessionId}.`);
			}
		} catch (err) {
			console.error(err);
		}
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
			console.error(err);
		}    
	}

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

			{/* Check if any sessions exist in the database by checking query results */}
			{ !allSessions.length 
				? (
                    <h3 className="no-sessions text-center">
                        No sessions yet :/ 
                        <br /><br />
                        Sign up or Login to create a session!
                    </h3> 
                ) : ( <>
					{/* Load the user's saved sessions */}
					{ loading 
						? ( <div>Loading...</div> ) 
						: (
							<div className="session-list d-flex justify-content-center"> 
								<div id="session-box">
									{/* Render each session using DisplaySession component */}
									{ allSessions && allSessions.map((session) => {
										return (
											<div key={session._id} className="card">
												<DisplaySession session={session} />
												{ Auth.loggedIn() && ( Auth.getProfile().data._id !== session.host._id ) && (!isAttending(session.attendees)) && 
													// Render a register button if the user is not already attending the session
													<div className='d-flex justify-content-evenly'>
														<button className="btn btn-primary btn-block m-2 py-3 col-md-5" style={{"background": "#769795"}} onClick={ () => handleAddAttendee(session._id) }>Register</button>
													</div>
												}
												{ Auth.loggedIn() && ( Auth.getProfile().data._id !== session.host._id ) && (isAttending(session.attendees)) && 
													// Render an unregister button if the user is already attending the session 
													<div className='d-flex justify-content-evenly'>
														<button className="btn btn-primary btn-block m-2 py-3 col-md-5" style={{"background": "#769795"}} onClick={ () => handleRemoveAttendee(session._id) }>Unregister</button>
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

export default ExploreSessions;
