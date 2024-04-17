import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

const SessionForm = () => {
    // TODO: useState to keep track of all form fields 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // TODO: Create a state for error to notify user when a field value is invalid

    // TODO: implement handleChange to validate the states of each field 
    const handleChange = (event) => {
        const { name, value } = event.target;
    
    };

    // TODO: handleFormSubmit - use mutation to addSession and redirect the user to My Sessions page 

    return (
        <div>
            <h4>Let's get to Prepping! </h4>
            <h5>Enter and submit the details of your session below.</h5>
            
            <form className="flex-row justify-center justify-space-between-md align-center">
            
                <div className="col-12 col-lg-9">
                    <section className='py-2'>
                        {/* Title */}
                        <input type="text" placeholder="What's the title of your session?" name="title" size='100'/>
                    </section>
                    <section className="py-2">
                        {/* Unit */}
                        <input type="text" placeholder='What unit of the class will you be studying?' size='50' />
                    </section>
                    <section className='py-2'>
                        {/* Description */}
                        <textarea 
                            name="description" 
                            id="description" 
                            cols="100" rows="10" 
                            placeholder="Enter the details of your session"
                        />
                    </section>
                    <section className='py-2'>
                        {/* Start Date and Time */}
                        <label htmlFor="start-date">When is your session starting?</label><br />
                        <input type="date" name="start_date" />
                        <input type="time" name="start_time" />
                    </section>
                    <section className='py-2'>
                        {/* End Date and Time */}
                        <label htmlFor="start-date">When is your session ending?</label><br />
                        <input type="date" name="end_date"/>   
                        <input type="time" name="end_time"/>
                    </section>
                    <section className='py-2'>
                        {/* Link */}
                        <input type="text" placeholder="Enter the meeting link for which you'll be hosting the session" size='100'/>
                    </section>
                </div>

                <div className="col-12 col-lg-3">
                    <button className="btn btn-primary btn-block py-3" type="submit">
                        Create Session!
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SessionForm;
