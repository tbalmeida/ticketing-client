import React from 'react';
import { Link } from 'react-router-dom';
function Login() {
    return (
        <div>
            <h1>Login page</h1>
            <p>Hello world!</p>
            <p><Link to='/'>
                Logout
            </Link>
            </p>
        </div>
    )
}

export default Login;