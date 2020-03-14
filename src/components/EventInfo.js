import React from 'react';
import { Link } from 'react-router-dom';
export default function EventInfo() {
    return (
        <div>
            <h1>Event Info page</h1>
            <p>Product Infomation</p>
            <p><Link to='/'>
                Go Home
            </Link>
            </p>
            <p><Link to='/cart'>
                Add to cart
            </Link>
            </p>
        </div>

    )
}

 