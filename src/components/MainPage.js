import React from 'react';
import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
const eventsArr = ['Event1', 'Event2', 'Event3']
function MainPage() {
    return (
        <>
        <div>
            <h1>Main page</h1>
            <p>Hello world!</p>
            <ul>
                <Link to='/login'>
                    <li>Login</li>
                </Link>
                <Link to='/Signup'>
                    <li>Signup</li>
                </Link>
            </ul>
        </div>
        <div>
            <h2>List of Events</h2>
            <ul>
                {eventsArr.map(item => (
                    <Link to='/event'>
                        <li>{item}</li>
                    </Link>
                    
                ))}
            </ul>
        </div>
        <input type="Search" placeholder="type in events you want to find"></input>
        </>

    )
}

export default MainPage;