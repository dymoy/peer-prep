
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

function formatSessionDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const formattedStart = format(start, 'PPpp');
    const formattedEnd = format(end, 'PPpp');
    return {
        formattedStart,
        formattedEnd
    };
}



const addDateSuffix = (date) => {
    let dateStr = date.toString();
  
    // get last char of date string
    const lastChar = dateStr.charAt(dateStr.length - 1);
  //get the last element of the array accounting for the array being measured through a zero based index 
  //the array.length gets the amount of elements but its inflated by one when compared to the the actual index amount 
  // this applies to strings to 
    if (lastChar === '1' && dateStr !== '11') {
      dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
      dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
      dateStr = `${dateStr}rd`;
    } else {
      dateStr = `${dateStr}th`;
    }
  
    return dateStr;
  };
  //checks first if the input is a double digit number that starts with one, if not it re-assigns the variable to be itself with a indent
  
  // function to format a timestamp, accepts the timestamp and an `options` object as parameters
  module.exports = {formatSessionDates, formatDate: (
            
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
  ) => {
    // create month object
    const months = {
      0: monthLength === 'short' ? 'Jan' : 'January',
      1: monthLength === 'short' ? 'Feb' : 'February',
      2: monthLength === 'short' ? 'Mar' : 'March',
      3: monthLength === 'short' ? 'Apr' : 'April',
      4: monthLength === 'short' ? 'May' : 'May',
      5: monthLength === 'short' ? 'Jun' : 'June',
      6: monthLength === 'short' ? 'Jul' : 'July',
      7: monthLength === 'short' ? 'Aug' : 'August',
      8: monthLength === 'short' ? 'Sep' : 'September',
      9: monthLength === 'short' ? 'Oct' : 'October',
      10: monthLength === 'short' ? 'Nov' : 'November',
      11: monthLength === 'short' ? 'Dec' : 'December',
    };
  
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
  
    const dayOfMonth = dateSuffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();
  
    const year = dateObj.getFullYear();
    let hour =
      dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() - 12)
        : dateObj.getHours();
  
    // if hour is 0 (12:00am), change it to 12
    if (hour === 0) {
      hour = 12;
    }
  
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  
    // set `am` or `pm`
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am'; // if the current time is more than
  
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
    return formattedTimeStamp;

        }
    };

  
    


    