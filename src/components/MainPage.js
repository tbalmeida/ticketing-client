import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventList from './EventList';

function getData(url) {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/1.0${url}`)
}


function MainPage() {
    const [users, setUsers]=useState([]);
    const [events, setEvents]=useState([]);
    const [venues, setVenues]=useState([]); 
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
    // const eventsArr = [{ event:'Event1', id: 1}, { event:'Event2', id: 2}, { event:'Event3', id: 3}]
    useEffect(() => {
        Promise.all([
            
         getData('/events'),
         getData('/venues'),
        ])
          .then((all) => {
          console.log("MainPage -> all", all[0])
          
            const [events, venues] = all;
            setEvents(events.data);
            setVenues(venues.data);
          })
          .catch(err => {
            console.error('ERRRROROROROR', err)
          })
      }, [])


    return (
       <>
        <div>
            <h2>List of Events</h2>
            <ul>
                <li ><EventList eventData={events}/></li>
            </ul>
        </div>
        <input type="Search" placeholder="type in events you want to find"></input>
        </>

    )
}

export default MainPage;
