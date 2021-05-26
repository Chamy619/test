import axios from 'axios';
import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    AUTH_USER
} from './types.js';

export function loginUser(dataToSubmit) {
    const request = axios.post('http://localhost:5000/api/user/login', dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    };
}

export function logoutUser(dataToSubmit) {
    const request = axios.get('http://localhost:5000/api/user/logout', {
        headers: {
            authorization: dataToSubmit
        }
    }).then(response => response.data);

    return {
        type:LOGOUT_USER,
        payload: request
    };
}

export function registerUser(dataToSubmit) {
    const request = axios.post('http://localhost:5000/api/user/register', dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    };
}

export function auth() {
    const token = JSON.parse(localStorage.getItem('user_token'));
    const request = axios.get('http://localhost:5000/api/user/auth', {
        headers: {
            authorization: token
        }
    }).then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    };
}