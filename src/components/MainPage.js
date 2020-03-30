import React from "react";
import axios from "axios";
import EventList from "./EventList";

export function getData(url) {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/1.0${url}`);//localhost
    // return axios.get(`https://radiant-escarpment-02459.herokuapp.com/api/1.0${url}`);
    // return axios.get(`/api/1.0${url}`);
}

function MainPage({ events, addToCart }) {
    console.log("MainPage -> events", events)
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
