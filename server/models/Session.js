const { Schema, model } = require('mongoose');

const sessionSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String, 
        required: true
    },
    unit: {
        type: String, 
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    link: {
        type: String, 
        required: true
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    attendees: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
});

// TODO: Create helper function to create Date object for start_time and end_time 

const Session = model('Session', sessionSchema);

module.exports = Session;

