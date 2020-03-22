import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useStyles from "./EventListStyles.js";
import Container from "@material-ui/core/Container";
import moment from "moment";
import { AlertContext } from "components/context/alert/alertContext";
import { Alert } from "components/Alert";

export const getEventFromEventsByEventId = (eventId, events) => {
    return events.find(event => event.event_id === eventId);
};

const convertDuration = function(string) {
    let finalResult = "";
    let stringArr = string.split(":");
    if (stringArr[0][0] === "0") {
        stringArr[0] = stringArr[0][1];
    }
    if (stringArr[1] === "00") {
        finalResult = `${stringArr[0]} hours`;
    } else {
        finalResult = `${stringArr[0]} hours and ${stringArr[1]} minutes`;
    }

    return finalResult;
};

const convertTime = function(time) {
    let splitTime = time.split(":").splice(0, 2);
    if (time.length > 1) {
        splitTime[2] = +splitTime[0] < 12 ? "AM" : "PM";
        splitTime[0] = +splitTime[0] % 12 || 12;
    }
    return `${splitTime[0]}:${splitTime[1]} ${splitTime[2]}`;
};

export default function EventInfo({ addToCart, events, location, match }) {
    const { show, hide } = useContext(AlertContext);
    const applyAddToCart = eventID => {
        if (!userId) {
            show("Please login first", "danger");
        } else {
            show("Item was added to the card", "success");
            addToCart(eventID);
        }
    };
    const userId = sessionStorage.getItem("userId");
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
                <Alert />
                <Grid container>
                    <Grid
                        item
                        key={event.event_id}
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
                                <Typography
                                    align="center"
                                    gutterBottom
                                    variant="h5"
                                    // component="body"
                                >
                                    {event.title}
                                </Typography>
                                <br />
                                <Typography
                                    gutterBottom
                                    variant="body1"
                                    // component="body"
                                >
                                    {event.event_description}
                                </Typography>
                                <br />

                                <Typography
                                    gutterBottom
                                    variant="body1"
                                    // component="body"
                                >
                                    The event will be held on{" "}
                                    {moment().format(
                                        "MMM Do YYYY",
                                        event.event_date
                                    )}{" "}
                                    at {convertTime(event.event_time)} for{" "}
                                    {convertDuration(event.duration)} at{" "}
                                    {event.venue_name}.<br />${event.venue_name}{" "}
                                    is equipped with ${event.venue_description}
                                    <br />
                                    Max event capacity: {
                                        event.capacity
                                    } people. <br />
                                    Max tickets per user: {event.limit_per_user}
                                    .
                                </Typography>
                                <br />
                                <Typography
                                    gutterBottom
                                    variant="body1"
                                    // component="body"
                                >
                                    Event Fee: {event.fee}CAD
                                </Typography>
                                <br />
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
                                {/* <button>
                                    {userId ? <Link to="/cart">Go to cart</Link> : show("You need to login first", "danger")}
                                </button> */}
                                <button
                                    onClick={() =>
                                        applyAddToCart(event.event_id)
                                    }
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
