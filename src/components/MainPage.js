import React from "react";
import axios from "axios";
import EventList from "./EventList";

export function getData(url) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL_HEROKU}/api/1.0${url}`);
}

function MainPage({ events, addToCart }) {
    return (
        <>
            <div>
                <ul>
                    <li>
                        <EventList addToCart={addToCart} eventData={events} />
                    </li>
                </ul>
            </div>
        </>
    );
}

export default MainPage;
