import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_SESSION } from '../utils/mutations';
import Auth from '../utils/auth';

const UpdateSessionForm = ({session}) => {

    // Create states to keep track of all form fields to create the Session document
    const [title, setTitle] = useState(session.title);
    const [unit, setUnit] = useState(session.unit);
    const [description, setDescription] = useState(session.description);
    const [start_date, setStartDate] = useState(session.start_date);
    const [end_date, setEndDate] = useState(session.end_date);
    const [link, setLink] = useState(session.link);

    // Create a state for error to notify user when a field value is invalid
    const [error, setError] = useState('');

    // Implement handleInputChange to validate the states of each field 
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name == 'title') {
            setTitle(value);
        } else if (name == 'unit') {
            setUnit(value);
        } else if (name == 'description') {
            setDescription(value);
        } else if (name == 'link') {
            setLink(value);
        }
    };

    // Implment handleDateChange to validate the start date is before the end date, and vice versa
    const handleDateChange = (event) => {
        const { name, value } = event.target;

        if (name == 'start_date') {
            // Check if end_date is not empty 
            if (end_date !== '') {
                // Validate that the start_date is before the end_date
                if (Date.parse(value) < Date.parse(end_date)) {
                    setStartDate(value);
                    setError('');
                } else {
                    setError('Please enter a start date and time before the end date.')
                }
            } else {
                setStartDate(value);
            }
        } else if (name == 'end_date') {
            // Check if start_date is not empty 
            if (start_date != '') {
                // Validate that the end_date is after the start_date 
                if (Date.parse(value) > Date.parse(start_date)) {
                    setEndDate(value);
                    setError('');
                } else {
                    setError('Please enter an end date and time after the start date.');
                }
            } else {
                setEndDate(value);
            }
        }
    }

    // Implement validateFilled to ensure that all fields are not empty
    const validateFilled = (event) => {
        const { name, value } = event.target;

        if (!value) {
            // Notify the user the field is required for the form 
            setError(`The ${name} field is required!`)
        } else {
            // Reset the error message
            setError('');
        }
    }

    const [updateSession, { updateSessionError }] = useMutation(UPDATE_SESSION);

    // Implement handleFormSubmit that uses addSession mutation and redirects the user to My Sessions page 
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const sessionData = {
            _id: session._id,
            title: title,
            unit: unit,
            description: description,
            start_date: start_date,
            end_date: end_date,
            link: link,
        };

        try {
            // useMutation updateSession to update the session using sessionData as sessionInput
            const { data } = await updateSession({
                variables: {
                    "sessionInput": sessionData,
                }
            });

            // Redirect the user back to MySessions page
            window.location = '/mysessions';
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div id='update-session-main'>
            <h5>Update Session Details</h5>
            <form className="flex-row justify-center justify-space-between-md align-center" onSubmit={handleFormSubmit}>
            
                <div className="col-12 col-lg-9">
                    <section className='py-2'>
                        {/* Title */}
                        <input 
                            required
                            type="text" 
                            placeholder="What's the title of your session?" 
                            name="title" 
                            size='100' 
                            className="input-new-session"
                            onChange={handleInputChange} 
                            onBlur={validateFilled}
                            value={title}
                        />
                    </section>
                    <section className="py-2">
                        {/* Unit */}
                        <input 
                            required
                            type="text" 
                            placeholder='What unit of the class will you be studying?' 
                            name='unit'
                            size='50' 
                            className="input-new-session"
                            onChange={handleInputChange} 
                            onBlur={validateFilled}
                            value={unit}
                        />
                    </section>
                    <section className='py-2'>
                        {/* Description */}
                        <textarea 
                            required
                            name="description" 
                            id="description" 
                            cols="100" rows="10" 
                            placeholder="Enter the details of your session"
                            className="input-new-session"
                            onChange={handleInputChange}
                            onBlur={validateFilled}
                            defaultValue={description}
                        />
                    </section>
                    <section className='py-2'>
                        {/* Start Date and Time */}
                        <label className="form-label" htmlFor="start-date">When is your session starting?</label><br />
                        <input 
                            required
                            type="datetime-local" 
                            name="start_date"
                            onChange={handleDateChange}
                            value={start_date}
                        />
                    </section>
                    <section className='py-2'>
                        {/* End Date and Time */}
                        <label className="form-label" htmlFor="start-date" >When is your session ending?</label><br />
                        <input 
                            required
                            type="datetime-local" 
                            name="end_date" 
                            onChange={handleDateChange}
                            value={end_date}
                        />   
                    </section>
                    <section className='py-2'>
                        {/* Link */}
                        <input 
                            required
                            type="text" 
                            name="link"
                            placeholder="Enter the meeting link for which you'll be hosting the session" 
                            size='100' 
                            className="input-new-session"
                            onChange={handleInputChange}
                            value={link}
                        />    
                    </section>
                </div>
                {/* Present errors, if any */}
                { error && (
                    <div>
                        <p className="error-text">* {error} *</p>
                    </div>
                )}
                <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#d6d4c7', color: '#9d4836', margin: '40px 40px', fontWeight: 'bold', border: 'none' }}>Save</button>
            </form>
        </div>
    );
}

export default UpdateSessionForm;
