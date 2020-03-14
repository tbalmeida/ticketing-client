import React from 'react';
import { Link } from 'react-router-dom';
export default function Order() {
    return (
        <div>
            <h1>Ticket(Receipt)</h1>
            <p>You paid x amount</p>
            <p><Link to='/'>
                Go Home
            </Link>
            </p>
        </div>

    )
}
