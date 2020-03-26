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
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export const getEventFromEventsByEventId = (eventId, events) => {
    return events.find(event => event.event_id === eventId);
};

export const convertDuration = function(string) {
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

export const convertTime = function(time) {
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
            //if item in the cart don't do anything and show the
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
                <Grid container spacing={4}>
                    <Grid
                        item
                        key={event.event_id}
                        maxWidth="sm"
                        className={classes.cardGrid}
                    >
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
                                    {/* Event Fee: {event.fee}CAD */}
                                </Typography>
                                <br />
                            </CardContent>
                            {/* <CardMedia
                            className={classes.cardMedia}
                            // image = {mechanic.avatar}
                            title="Image title"
                        /> */}
                            <div>
                                <Button
                                    className={classes.margin}
                                    variant="outlined"
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    component={Link}
                                    to={"/"}
                                    aria-label="delete"
                                    endIcon={<HomeIcon />}
                                >
                                   Go home
                                </Button>
                                <Button
                                    className={classes.margin}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    onClick={() =>
                                        applyAddToCart(event.event_id)
                                    }
                                    endIcon={<AddShoppingCartIcon/>}
                                >
                                   Add to Cart
                                </Button>
                                <Button
                                    className={classes.margin}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    component={Link}
                                    to={"/cart"}
                                    endIcon={<ShoppingCartIcon/>}
                                >
                                    Go to cart
                                </Button>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
