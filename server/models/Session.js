const { Schema, model } = require('mongoose');
const  {calculateStartandEndDate}  = require('../utils/dateUtils');

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
    durationInHours: {
        type: Number,
        
    },
    durationInMinutes: {
        type: Number
    },
    end_date: {
        type: Date 
    },
    link: {
        type: String, 
        required: true
    },
    host: {
        // Reference the host name, NOT the ID
        type: String,
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
// 
sessionSchema.pre("save", function(next) {
    if (this.durationInHours || this.durationInMinutes) {
        const { startDate, endDate } = calculateStartandEndDate(this.start_time, this.durationInHours || 0, this.durationInMinutes || 0);
        this.start_time = startDate;
        this.end_date = endDate;
    }
    next();
});



const Session = model('Session', sessionSchema);

module.exports = Session;

