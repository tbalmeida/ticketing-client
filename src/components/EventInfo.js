import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import useStyles from "./EventListStyles.js";
import Container from "@material-ui/core/Container";
import moment from "moment";
import { AlertContext } from "components/context/alert/alertContext";
import { Alert } from "components/Alert";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";

export const getEventFromEventsByEventId = (eventId, events) => {
    return events.find(
        (event) => event.event_id === eventId || event.id === eventId
    );
};

export const convertDuration = function (string) {
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

export const convertTime = function (time) {
    let splitTime = time.split(":").splice(0, 2);
    if (time.length > 1) {
        splitTime[2] = +splitTime[0] < 12 ? "AM" : "PM";
        splitTime[0] = +splitTime[0] % 12 || 12;
    }
    return `${splitTime[0]}:${splitTime[1]} ${splitTime[2]}`;
};

export default function EventInfo({
    addToCart,
    events,
    location,
    match,
    cartItems,
}) {
    const { show, hide } = useContext(AlertContext);

    useEffect(() => {
        return hide;
    }, []);

    const applyAddToCart = (eventID) => {
        if (!userId) {
            show("Please login first", "danger");
            setTimeout(() => {
                hide();
            }, 5000);
        } else {
            //if item in the cart don't do anything and show the
            show("Item was added to the card", "success");
            addToCart(eventID);
            setTimeout(() => {
                hide();
            }, 5000);
        }
    };

    const userId = sessionStorage.getItem("userId");
    const classes = useStyles();
    const routeCart = cartItems && cartItems[0] ? "/cart" : "/";
    // if the component is loaded as a result of user clicking on an event from the home page
    // props.location.state should exist
    // otherwise event is looked up from the events array with props.match.params.id
    const event =
        location && location.state
            ? location.state
            : getEventFromEventsByEventId(match.params.id, events);
    console.log("event", event);

    function Map() {
        const [selectedEvent, setSelectedEvent] = useState(null);
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 51.0447, lng: -114.0719 }}
            >
                <Marker
                    key={event.event_id}
                    position={{
                        lat: event.lat,
                        lng: event.lng,
                    }}
                    onClick={() => {
                        setSelectedEvent(event);
                    }}
                />
                {selectedEvent && (
                    <InfoWindow
                        position={{
                            lat: event.lat,
                            lng: event.lng,
                        }}
                        onCloseClick={() => {
                            setSelectedEvent(null);
                        }}
                    >
                        <h6>{event.title}</h6>
                    </InfoWindow>
                )}
            </GoogleMap>
        );
    }

    const WrappedMap = withScriptjs(withGoogleMap(Map));
    return (
        <div className={classes.height}>
            <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
                <Alert />
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <Grid container maxWidth="md" spacing={2}>
                            <Grid item xs={4}>
                                <Box align="center">
                                    <img height={200} src={event.event_img} />
                                </Box>
                            </Grid>
                            <Grid item container xs={8} align="left">
                                <Grid
                                    item
                                    container
                                    ontainer
                                    direction="column"
                                    justify="space-between"
                                >
                                    <Typography
                                        id="card_title"
                                        className={classes.title3}
                                        variant="body1"
                                    >
                                        {event.title}
                                    </Typography>
                                    <Typography
                                        align="left"
                                        className={classes.title2}
                                        variant="body1"
                                    >
                                        {moment(event.event_date).format(
                                            "MMM Do YYYY",
                                            event.event_date
                                        )}{" "}
                                        at {convertTime(event.event_time)}
                                    </Typography>
                                    <Typography
                                        align="left"
                                        className={classes.title2}
                                        variant="body1"
                                    >
                                        {event.venue_name}
                                    </Typography>
                                    <Typography
                                        align="left"
                                        className={classes.title2}
                                        variant="body1"
                                    >
                                        {event.total_issued} available -{" "}
                                        {event.price}
                                    </Typography>
                                    <Typography
                                        align="left"
                                        className={classes.title2}
                                        variant="body1"
                                    >
                                        Maximum {event.limit_per_user} per
                                        person
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    align="justify"
                                    className={classes.title2}
                                    variant="body1"
                                    style={{ paddingLeft: "2rem" }}
                                >
                                    {event.event_description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box align="center">
                                    <Button
                                        className={classes.margin}
                                        variant="outlined"
                                        size="medium"
                                        color="black"
                                        onClick={() =>
                                            applyAddToCart(event.event_id)
                                        }
                                        endIcon={<AddShoppingCartIcon />}
                                    >
                                        Add to Cart
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>

                        <Container id="map">
                            <WrappedMap
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                                loadingElement={
                                    <div style={{ height: `100%` }} />
                                }
                                containerElement={
                                    <div style={{ height: `400px` }} />
                                }
                                mapElement={<div style={{ height: `100%` }} />}
                            ></WrappedMap>
                        </Container>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}
