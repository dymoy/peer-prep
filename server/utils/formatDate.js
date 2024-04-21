/**
 * @function formatDate
 * Helper function to format a given Date object to a String for the client
 * e.g., formatDate(new Date(2020, 0, 1, 17, 30)) returns 'Jan 1st, 2020 at 5:30 pm'
 * @param {*} date 
 * @returns String
 */
const formatDate = (date) => {
	// If the input is a string, parse it into a Date object
	if (typeof date === 'string') {
		date = new Date(date);
	}

	// Ensure the input is a Date object
	if (!(date instanceof Date) || isNaN(date)) { 
		throw new Error('Invalid date format');
	}

	// Create month object
	const months = {
		0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun',
		6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'
	};

	const formattedMonth = months[date.getMonth()];

	const dayOfMonth = addDateSuffix(date.getDate());

	const year = date.getFullYear();
	let hour =
		date.getHours() > 12
		? Math.floor(date.getHours() - 12)
		: date.getHours();

	// If hour is 0 (12:00am), change it to 12
	if (hour === 0) {
		hour = 12;
	}

	const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

	// set `am` or `pm`
	const periodOfDay = date.getHours() >= 12 ? 'pm' : 'am';

  	return `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
};

/**
 * @function addDateSuffix
 * Helper function to add suffix to date's day (e.g., st, nd, rd, th)
 * @param {*} date 
 * @returns String
 */
const addDateSuffix = (date) => {
	let dateStr = date.toString();
	const lastChar = dateStr.charAt(dateStr.length - 1);

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

module.exports = {formatDate};
