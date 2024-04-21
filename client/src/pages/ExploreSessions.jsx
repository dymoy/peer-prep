import { useQuery, useMutation } from '@apollo/client';
import SessionsList from "../components/SessionsList";

import { QUERY_ALL_SESSIONS } from '../utils/queries';
import { ADD_ATTENDEE, REMOVE_ATTENDEE } from '../utils/mutations';

const ExploreSessions = () => {
	const { loading, data } = useQuery(QUERY_ALL_SESSIONS);
	const allSessions = data?.allSessions || [];

	console.log(allSessions);

	// Helper function to determine if the active user is already registered to the session in question
	const isAttending = (attendees) => {
		var attending = false;

		attendees.forEach((attendee) => {
			if (attendee._id == Auth.getProfile().data._id) {
				attending = true;
			}
		});

		return attending;
	}

  	// Adds the current auth user to the attendees array of the selected Session
  	const [addAttendee, { addAttendeeError }] = useMutation(ADD_ATTENDEE, {
		refetchQueries: [
			QUERY_ALL_SESSIONS
		]
	});

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

	// Removes the current auth user from the attendees array of the selected Session
	const [removeAttendee, { removeAttendeeError }] = useMutation(REMOVE_ATTENDEE, {
		refetchQueries: [
			QUERY_ALL_SESSIONS
		]
	});
    
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
		
			<div id="sessions-list">
				{loading 
				? ( <div>Loading...</div> ) 
				: (
					<SessionsList
					sessions={ allSessions }
					/>
				)}
				
			</div>
		</main>
	);
};

export default ExploreSessions;
