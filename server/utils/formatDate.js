
// Define a helper function to calculate the end date based on start time and duration
/* function calculateStartandEndDate(startTime, durationHours, durationMinutes) {
    const endDate = new Date(startTime);
    const startDate = new Date(startTime);
    endDate.setHours(endDate.getHours() + durationHours);
    endDate.setMinutes(endDate.getMinutes() + durationMinutes);
    return { startDate, endDate }; 
}   

module.exports = { calculateStartandEndDate };
*/  //this is for if we want to calculate the end date based on the start time and duration

// Import date-fns for handy formatting functions
const { format } = require('date-fns');

// TODO: Reformat this to be usable by Post and Comment models
function formatDate(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const formattedStart = format(start, 'PPpp');
    const formattedEnd = format(end, 'PPpp');
    return {
        formattedStart,
        formattedEnd
    };
}

module.exports = {
    formatDate
};
