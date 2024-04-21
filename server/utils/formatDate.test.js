/**
 * @file formatDate.test.js
 * Test Suite for the formatDate helper function
 * Note: Test scripts validates in PST
 */

const { formatDate } = require('./formatDate');

describe('formatDate', () => {
    it('returns formatted date string from Date object', () => {
        const date = new Date(2020, 0, 1, 17, 30);
        const formattedDate = formatDate(date);

        expect(formattedDate).toBe('Jan 1st, 2020 at 5:30 pm');
    });

    it('returns formatted date string from ISO date string', () => {
        const date = '2020-01-01T17:30:00.000Z';
        const formattedDate = formatDate(date);

        expect(formattedDate).toBe('Jan 1st, 2020 at 9:30 am');
    });

    it('throws error if invalid date provided', () => {
        expect(() => formatDate('invalid')).toThrowError('Invalid date format');
        expect(() => formatDate(123)).toThrowError('Invalid date format');
    });
});
