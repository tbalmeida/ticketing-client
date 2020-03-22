import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useStyles from "./EventListStyles.js";
import Container from "@material-ui/core/Container";

export const getEventFromEventsByEventId = (eventId, events) => {
    return events.find(event => event.event_id === eventId);
};

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
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography align="center"
                                gutterBottom
                                variant="h5"
                                // component="body"
                            >
                                {event.title}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="body"
                                // component="body"
                            >
                                {event.event_description}
                            </Typography>
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
