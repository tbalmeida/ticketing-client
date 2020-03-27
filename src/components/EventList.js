import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "./EventListStyles.js";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import TypeSentence from "./TypedSentence";
import { Alert } from "components/Alert";
import { AlertContext } from "components/context/alert/alertContext";
import PropTypes from "prop-types";
import Theatre from "./img/theatre.png";
import Golden from "./img/golden-ticket.jpg";
import BackspaceSharpIcon from "@material-ui/icons/BackspaceSharp";
import moment from "moment";
import { convertTime } from "components/EventInfo";
import AddShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export default function EventList({ eventData, addToCart }) {
    console.log("EventList -> eventData", eventData);
    console.log("EventList -> addToCart", addToCart);
    console.log("eventData", eventData);
    const [select, setSelect] = useState("");
    const [EventsList, setEventsList] = useState("");

    const { show, hide } = useContext(AlertContext);
    const applyAddToCart = eventID => {
        if (!userId) {
            show("Please login first", "danger");
            setTimeout(() => { hide()}, 5000); 
        } else {
            show("Item was added to the card", "success");
            addToCart(eventID);
            setTimeout(() => { hide()}, 3000); 
        }
    };

    const classes = useStyles();

    const selectEvent = e => setSelect(e.target.value);

    const clearSearch = () => {
        setSelect("");
    };

    useEffect(() => {
        const filtered = eventData.filter(
            event =>
                event.title.toLowerCase().search(select.toLowerCase()) !== -1
        );
        filtered.length !== 0
            ? setEventsList(filtered)
            : setEventsList(eventData);
        !select && hide();
        select &&
            EventsList === eventData &&
            show(" No match found", "warning");
            setTimeout(() => { hide()}, 5000); 

    }, [select, eventData]);

    const userId = sessionStorage.getItem("userId");

    return (
        <Fragment>
            <div className={classes.heroContent}>
                <Container maxWidth="md">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        className={classes.gutterBottom}
                    >
                        <img
                            src={Golden}
                            alt="site logo"
                            height={100}
                            margin="1em"
                        />
                        <img src={Theatre} alt="site logo" height={70} />
                    </Typography>
                    <TypeSentence />
                </Container>
                <Container maxWidth="sm">
                    <Alert />
                    <form
                        className="form-inline my-2 my-lg-0"
                        style={{ flexFlow: "nowrap" }}
                    >
                        <input
                            variant="outlined"
                            color="primary"
                            id="searchEvents"
                            value={select}
                            className="form-control mr-2 mx-sm-auto"
                            onChange={selectEvent}
                            type="search"
                            placeholder="Search for an Event"
                            aria-label="Search"
                            style={{ minWidth: "125px", width: "100%" }}
                        />
                        {/* <Button
                            size="medium"
                            variant="outlined"
                            color="primary"
                            onClick={clearSearch}
                            endIcon={<BackspaceSharpIcon />}
                        >
                            Clear
                        </Button> */}
                    </form>
                </Container>
                {!userId && (
                    <div className={classes.loginRequest}>
                        Please login or signup to buy an event ticket
                    </div>
                )}
            </div>
            <Divider variant="middle" />
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={2}>
                    {[...EventsList].map(event => (
                        <Grid item key={event.event_id} xs={12} sm={6} md={6}>
                            <Link
                                to={{
                                    pathname: `/events/${event.event_id}`,
                                    state: event
                                }}
                            >
                                <Card className={classes.card}>
                                    <CardContent
                                        className={classes.cardContent}
                                    >
                                        <Grid container border={1}>
                                            <Grid item xs={6}>
                                                <Typography
                                                    className={classes.title1}
                                                    variant="body1"
                                                >
                                                    {event.title}
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={6}
                                                align="right"
                                            >
                                                <Typography
                                                    className={classes.title2}
                                                    variant="body1"
                                                >
                                                    {moment().format(
                                                        "MMM Do YYYY",
                                                        event.event_date
                                                    )}{" "}
                                                    at{" "}
                                                    {convertTime(
                                                        event.event_time
                                                    )}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                            </Grid>
                                            <Grid item xs={6} align="right">
                                                <Typography
                                                    className={
                                                        classes.marginBottom
                                                    }
                                                    variant="body1"
                                                >
                                                    {event.venue_name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} align="justify">
                                                <Typography variant="body1">
                                                    {" "}
                                                    {event.event_description}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}></Grid>
                                            <Grid item xs={4} align="right">
                                                <Button
                                                    className={classes.margin}
                                                    variant="outlined"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() =>
                                                        applyAddToCart(
                                                            event.event_id
                                                        )
                                                    }
                                                    endIcon={
                                                        <AddShoppingCartIcon />
                                                    }
                                                >
                                                    Add to Cart
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Fragment>
    );
}

EventList.propTypes = {
    eventData: PropTypes.array.isRequired
};
