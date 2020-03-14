import React from 'react';
import { Link } from 'react-router-dom';
export default function Cart() {
    return (
        <div>
            <h1>Cart</h1>
            <p>Product Infomation</p>
            <p><Link to='/'>
                Go Home
            </Link>
            </p>
            <p><Link to='/checkout'>
                Checkout
            </Link>
            </p>
        </div>

    )
}
