import UpdateSessionForm from '../components/UpdateSessionForm';
import { useLocation } from 'react-router-dom';

const UpdateSession = () => {
    const { state } = useLocation();
    const sessionId = state.sessionId;

    

    return (
        <div>
            <UpdateSessionForm sessionId={ sessionId }/>
        </div>
    )
};

export default UpdateSession;