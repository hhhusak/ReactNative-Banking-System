import axios from 'axios';

const API_KEY = 'AIzaSyAH_yTATN4rm8jAs-ihGq1guYKq0WaOHDo';
const URL_DATABASE = 'https://betabankdatabase-default-rtdb.firebaseio.com';

export var tokenGlobal;

async function authenticate(mode, email, password, username) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const urlDatabase = `${URL_DATABASE}/users.json`;

    var userData = {
        username: username,
        transactions: [],
        collections: []
    }
    await axios.post(urlDatabase, userData);
    const response = await axios.post(url,
        {
            email: email,
            password: password,
            returnSecureToken: true,
        });
    const token = response.data.idToken;
    console.log(token);
    return token;
}

export async function createUser(email, password, username) {
    return authenticate('signUp', email, password, username);
}

export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}