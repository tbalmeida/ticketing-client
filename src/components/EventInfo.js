import React, { useEffect, useContext } from "react";
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

export const getEventFromEventsByEventId = (eventId, events) => {
    return events.find(
        event => event.event_id === eventId || event.id === eventId
    );
};
const map = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d160599.78948270393!2d-114.22825994752141!3d51.02775509633721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537170039f843fd5%3A0x266d3bb1b652b63a!2sCalgary%2C%20AB!5e0!3m2!1sen!2sca!4v1585719190554!5m2!1sen!2sca";
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

export default function EventInfo({
    addToCart,
    events,
    location,
    match,
    cartItems
}) {
    const { show, hide } = useContext(AlertContext);

    useEffect(() => {
        return hide;
    }, []);

    const applyAddToCart = eventID => {
        if (!userId) {
            show("Please login first", "danger");
            setTimeout(() => { hide()}, 5000); 
        } else {
            //if item in the cart don't do anything and show the
            show("Item was added to the card", "success");
            addToCart(eventID);
            setTimeout(() => { hide()}, 5000);
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
    return (
        <div className={classes.height}>
            <Typography gutterBottom align="center" variant="h4" style={{padding: "1rem", textTransform: "uppercase", fontWeight: "bold"}}>
                Event Info page
            </Typography>
            <Container maxWidth="md">
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
                                    <Typography id="card_title"
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
                                    <Typography align="left" variant="body1">
                                        {event.total_issued} available -{" "}
                                        {event.price}
                                    </Typography>
                                    <Typography
                                        align="left"
                                        className={classes.font80}
                                        variant="body1"
                                    >
                                        Maximum {event.limit_per_user} per
                                        person
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="center" variant="body1">
                                    {event.event_description}
                                </Typography>
                            </Grid>
                            {/* <Grid item xs={8}></Grid> */}
                            <Grid item xs={12}>
                                <Box align="center">
                                    <Button
                                        className={classes.margin}
                                        variant="outlined"
                                        size="small"
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
                        <Container style={{display: 'flex'}}><iframe src={map} width={"480"} height={"360"} frameborder={"0"} style={{border: "0", margin: '0 auto'}} allowfullscreen={"true"} aria-hidden={"false"} tabindex={"0"}></iframe></Container>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}
