// src/services/authService.js

import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL; // The Express API url

/* Allows new user to sign up */
async function signup(formData) {

    try { /* Creates user object from the REACT front end */
        const response = await axios.post(`${BACKEND_URL}/users/signup`, formData)

        if (response.data.error) {
            throw new Error(response.data.error)
        }

        if (response.data.token) {
            localStorage.setItem('token', response.data.token); // Stores the JWT token into the browser's localStorage

            const user = JSON.parse(atob(response.data.token.split('.')[1]))
            return user;
        }

    } catch (error) {
        console.log(error)
    }
}

/* Allows existing user to sign in */
async function signin(user) {

    try { /* Accesses exsiting user object from the REACT front end */
        const response = await axios.post(`${BACKEND_URL}/users/signin`, user)

        if (response.data.error) {
            throw new Error(response.data.error)
        }

        /* Takes "Bearer" out of the token response */
        if (response.data.token) {
            localStorage.setItem('token', response.data.token); // Stores the JWT token into the browser's localStorage

            const user = JSON.parse(atob(response.data.token.split('.')[1]))
            return user;
        }

        return response.data

    } catch (error) {
        console.log(error)
    }
}

/* Will check if the user has signed in on a previous session, if so, loads their profile no problem. If not, sets to null */
function getUser() {

    const token = localStorage.getItem('token');
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
}

function signout() {
    localStorage.removeItem('token');
}

export { signup, signin, getUser, signout }
