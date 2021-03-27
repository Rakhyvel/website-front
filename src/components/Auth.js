/*  auth.js

    This component handles the username, password, login button, and eventually
    fetchng the token from the backend.
*/

import "./common.css";
import {useState} from 'react';

async function loginUser(credentials) {
    const res = await fetch('http://josephs-projects.com:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    const data = res.json();
    return data;
}

const Auth = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const tok = await loginUser({
            username,
            password
        });
        setToken(tok);
        window.location.href = "/dashboard";
    }

    return (
        <>
            <h1>Login</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUsername(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    )
}

export default Auth
