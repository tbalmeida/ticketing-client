import React from 'react';
import { Link } from 'react-router-dom';
function Signup() {
    return (
        <div>
            <h1>Signup page</h1>
            <p>Hello world!</p>
            <p><Link to='/'>
                Logout
            </Link>
            </p>
        </div>

    )
}

export default Signup;