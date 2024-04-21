/**
 * @file auth.js
 * Handles JWT authentication for the user session
 */

import decode from 'jwt-decode';

class AuthService {
    /* Get user data using the existing token */
    getProfile() {
        return decode(this.getToken());
    }

    /* Check if the user is logged in by validating the existing token */
    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token); 
    }

    /* Checks if the passed token value is expired */
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    /* Retrieves the user token from localStorage */
    getToken() {
        return localStorage.getItem('id_token');
    }

    /* Saves user token to localStorage */
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    /* Clear user token and profile data from localStorage and reset the state of the application */
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();
