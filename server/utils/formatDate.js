
// Define a helper function to calculate the end date based on start time and duration
function calculateStartandEndDate(startTime, durationHours, durationMinutes) {
    const endDate = new Date(startTime);
    const startDate = new Date(startTime);
    endDate.setHours(endDate.getHours() + durationHours);
    endDate.setMinutes(endDate.getMinutes() + durationMinutes);
    return { startDate, endDate }; 
}

module.exports = { calculateStartandEndDate };