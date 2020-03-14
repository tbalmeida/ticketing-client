import React from 'react';
import { Link } from 'react-router-dom';
export default function Checkout() {
    return (
        <div>
            <h1>Checkout </h1>
            <p>Payment with Stripe</p>
            <p><Link to='/'>
                Go Home
            </Link>
            </p>
            <p><Link to='/order'>
                Pay
            </Link>
            </p>
        </div>

    )
}