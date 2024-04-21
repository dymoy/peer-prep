/**
 * @file SessionForm.jsx 
 * React Component to render a form for authenticated users to create a new Session
 */

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SESSION } from '../utils/mutations';
import Auth from '../utils/auth';

const SessionForm = () => {
    const [title, setTitle] = useState('');
    const [unit, setUnit] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState('');
    const [addSession, { addSessionError }] = useMutation(ADD_SESSION);

    /* Update the states based on form input changes */
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

    /* Validate the start date is before the end date, and vice versa, before updating the states */
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

    /* Ensure that fields are not empty when users click away from the input fields */
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

    /* Handle form submission by calling addSession mutation, then redirect the user to MySessions page */ 
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Create the sessionInput variable to pass to addSession mutation
        const sessionData = {
            title: title,
            unit: unit,
            description: description,
            start_date: start_date,
            end_date: end_date,
            link: link,
            host: Auth.getProfile().data._id,
            attendees: []
        };

        try {
            // Call addSession to create the session using sessionData
            const { data } = await addSession({
                variables: {
                    "sessionInput": sessionData,
                }
            });

            // Reset states
            setTitle('');
            setUnit('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setLink('');
            setError('');

            // Redirect the user back to MySessions page
            window.location = '/mysessions';
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main id='new-session-main'>
            <h4>Let's get prepping! </h4>
            <h5>Enter the details of your session below:</h5>
            
            <form className="flex-row justify-center justify-space-between-md" onSubmit={handleFormSubmit}>
            
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
                            onChange={handleInputChange}/>
                    </section>
                </div>
                {/* Present errors, if any */}
                { error && (
                    <div>
                        <p className="error-text">* {error} *</p>
                    </div>
                )}
                <button className="btn btn-primary my-2" type="submit" style={{ backgroundColor: '#d6d4c7', color: '#9d4836', fontWeight: 'bold', border: 'none' }}>Create Session!</button>

            </form>
        </main>
    );
}

export default SessionForm;
