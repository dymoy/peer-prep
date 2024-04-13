const { Schema, model } = require('mongoose');
const { formatSessionDates } = require('../utils/formatDate');

//const { calculateStartandEndDate } = require('../utils/dateUtils');
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
    /*durationInHours: {
        type: Number,
        
    }, 
    durationInMinutes: {
        type: Number
    },
    */
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

 
//this is for if we want to calculate the end date based on the start time and duration
/*sessionSchema.pre("save", function(next) {
    if (this.durationInHours || this.durationInMinutes) {
        const { startDate, endDate } = calculateStartandEndDate(this.start_time, this.durationInHours || 0, this.durationInMinutes || 0);
        this.start_time = startDate;
        this.end_date = endDate;
    }
    next();
}); */

sessionSchema.pre('validate', function(next) {
    const startDate = new Date(this.start_time);
    const endDate = new Date(this.end_date);
    this.start_time = startDate;
    this.end_date = endDate;
    next();
});

sessionSchema.pre('save', async function(next) {
    const formattedDates = formatSessionDates(this.start_time, this.end_date);
    this.start_time = formattedDates.formattedStart;
    this.end_date = formattedDates.formattedEnd;
    next();
});




const Session = model('Session', sessionSchema);

module.exports = Session;

