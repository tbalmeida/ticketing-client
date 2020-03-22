import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useStyles from "./EventListStyles.js";
import Container from "@material-ui/core/Container";
import moment from 'moment'

export const getEventFromEventsByEventId = (eventId, events) => {
    return events.find(event => event.event_id === eventId);
};

const convertDuration = function (string) {
  let finalResult = '';
  let stringArr = string.split(":")
  if(stringArr[0][0] === "0") {
    stringArr[0] = stringArr[0][1];
  }
  if(stringArr[1] === "00") {
    finalResult = `${stringArr[0]} hours`
  } else {
    finalResult = `${stringArr[0]} hours and ${stringArr[1]} minutes`
  }

  return finalResult
}

const convertTime = function (time) {
  
  let splitTime = time.split(":").splice(0,2)
  if (time.length > 1) { 
    splitTime[2] = +splitTime[0] < 12 ? 'AM' : 'PM'; 
    splitTime[0] = +splitTime[0] % 12 || 12; 
  }
  return `${splitTime [0]}:${splitTime[1]} ${splitTime[2]}`
}
convertTime("19:00:00")
export default function EventInfo({ addToCart, events, location, match }) {
    const classes = useStyles();

    // if the component is loaded as a result of user clicking on an event from the home page
    // props.location.state should exist
    // otherwise event is looked up from the events array with props.match.params.id
    const event =
        location && location.state
            ? location.state
            : getEventFromEventsByEventId(match.params.id, events);
    return (
        <>
            <Typography gutterBottom align="center" variant="h4">
                Event Info page
            </Typography>
            <Container maxWidth="sm">
                <Grid
                    item
                    key={event.event_id}
                    container
                    maxWidth="sm"
                    className={classes.cardGrid}
                    spacing={4}
                >
                  {/* {eventData.map(event => (
                    <Link to={`events/${event.event_id}`}>
                        <h2>Event {event.event_id}</h2>
                        <p>{event.event_id}</p>   
                        <p>{event.title}</p>   
                        <p>{event.event_description}</p>   
                        <p>{event.event_date}</p>   
                        <p>{event.event_time}</p>   
                        <p>{event.duration}</p>   
                        <p>{event.total_issued}</p>   
                        <p>{event.limit_per_user}</p>   
                        <p>{event.price}</p>   
                        <p>{event.venue_id}</p>   
                        <p>{event.venue_name}</p>   
                        <p>{event.venue_description}</p>   
                        <p>{event.capacity}</p>   
                        <p>{event.fee}</p>   
                        <p>{event.percent_capacity}</p>   
                        <p>{event.max_revenue}</p>   
                        <hr></hr>
                    </Link>
                ))} */}
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography align="center"
                                gutterBottom
                                variant="h5"
                                // component="body"
                            >
                                {event.title}
                            </Typography><br/>
                            <Typography
                                gutterBottom
                                variant="body"
                                // component="body"
                            >
                                {event.event_description}
                            </Typography><br/>

                            <Typography
                                gutterBottom
                                variant="body"
                                // component="body"
                            >The event will be held on {' '} 
                                {moment().format('MMM Do YY',event.event_date)} at {convertTime(event.event_time)} for {convertDuration(event.duration)}
                            </Typography><br/>
                            <Typography
                                gutterBottom
                                variant="body"
                                // component="body"
                            >
                                Event Fee: {event.fee}
                            </Typography>
                        </CardContent>
                        {/* <CardMedia
                            className={classes.cardMedia}
                            // image = {mechanic.avatar}
                            title="Image title"
                        /> */}
                        <div>
                            <button>
                                <Link to="/">Go Home</Link>
                            </button>
                            <button>
                                <Link to="/cart">Go to cart</Link>
                            </button>
                            <button onClick={() => addToCart(event.event_id)}>
                                Add to Cart
                            </button>
                        </div>
                    </Card>
                </Grid>
            </Container>
        </>
    );
}
