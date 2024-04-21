/**
 * @file Session.js 
 * Define the schema for the mongoose model Session
 */

const { Schema, model } = require('mongoose');
const {formatDate} = require('../utils/formatDate');

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
    start_date: {
        type: Date,
        required: true,
        get: (timestamp) => formatDate(timestamp)
    },
    end_date: {
        type: Date,
        required: true,
        get: (timestamp) => formatDate(timestamp)
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

/* Cast the start_date and end_date to a Date object before creating the Session */
sessionSchema.pre('save', function(next) {
    this.start_date = new Date (this.start_date);
    this.end_date = new Date (this.end_date);
    next();
});

const Session = model('Session', sessionSchema);

module.exports = Session;
