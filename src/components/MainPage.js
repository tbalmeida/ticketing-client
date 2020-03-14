import React from 'react';
import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
    const eventsArr = [{ event:'Event1', id: 1}, { event:'Event2', id: 2}, { event:'Event3', id: 3}]
function MainPage() {
    return (
        <>
        {/* <div>
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
        </div> */}
        <div>
            <h2>List of Events</h2>
            <ul>
                {eventsArr.map(item => (
                    <Link to={`/event/${item.id}`}>
                        <li>{item.event}</li>
                    </Link>
                ))}
            </ul>
        </div>
        <input type="Search" placeholder="type in events you want to find"></input>
        </>

    )
}

export default MainPage;