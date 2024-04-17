import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

const SessionForm = () => {
    // Create states to keep track of all form fields to create the Session document
    const [title, setTitle] = useState('');
    const [unit, setUnit] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [link, setLink] = useState('');

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

    // TODO: handleFormSubmit - use mutation to addSession and redirect the user to My Sessions page 
    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        const sessionData = {
            title: title,
            unit: unit,
            description: description,
            start_date: start_date,
            end_date: end_date,
            link: link
        };

        console.log(sessionData);     

        // Reset states
        // setTitle('');
        // setUnit('');
        // setDescription('');
        // setStartDate('');
        // setEndDate('');
        // setLink('');
        // setError('');
    }

    return (
        <div>
            <h4>Let's get to Prepping! </h4>
            <h5>Enter and submit the details of your session below.</h5>
            
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
                            onChange={handleInputChange}
                            onBlur={validateFilled}
                        />
                    </section>
                    <section className='py-2'>
                        {/* Start Date and Time */}
                        <label htmlFor="start-date">When is your session starting?</label><br />
                        <input 
                            required
                            type="datetime-local" 
                            name="start_date" 
                            onChange={handleDateChange}
                        />
                    </section>
                    <section className='py-2'>
                        {/* End Date and Time */}
                        <label htmlFor="start-date">When is your session ending?</label><br />
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
                            onChange={handleInputChange}/>
                    </section>
                </div>
                {/* Present errors, if any */}
                { error && (
                    <div>
                        <p className="error-text">* {error} *</p>
                    </div>
                )}
                <button className="btn btn-primary btn-block py-3" type="submit">Create Session!</button>

            </form>
        </div>
    );
}

export default SessionForm;
