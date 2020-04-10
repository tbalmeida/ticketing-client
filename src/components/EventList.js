import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "./EventListStyles.js";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { Alert } from "components/Alert";
import { AlertContext } from "components/context/alert/alertContext";
import PropTypes from "prop-types";
import BackspaceSharpIcon from "@material-ui/icons/BackspaceSharp";
import moment from "moment";
import { convertTime } from "components/EventInfo";
import AddShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { ScrollTop } from "components/Helper Functions/ScrollToTop";

export default function EventList({ eventData, addToCart }) {
    console.log("EventList -> eventData", eventData)
    const [select, setSelect] = useState("");
    const [EventsList, setEventsList] = useState("");

    const { show, hide } = useContext(AlertContext);
    const applyAddToCart = eventID => {
        if (!userId) {
            show("Please login first", "danger");
            setTimeout(() => {
                hide();
            }, 5000);
        } else {
            show("Item was added to the card", "success");
            addToCart(eventID);
            setTimeout(() => {
                hide();
            }, 3000);
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
        setTimeout(() => {
            hide();
        }, 5000);
    }, [select, eventData]);

    const userId = sessionStorage.getItem("userId");

    return (
        <Box maxWidth="sm">
            <Box id="backgroundImage" className={classes.fontFamily}>
                <Container
                    id="search"
                    className={classes.fontFamily}
                >
                    <form>
                        <input
                            className={classes.fontFamily}
                            variant="outlined"
                            color="primary"
                            id="searchEvents"
                            value={select}
                            onChange={selectEvent}
                            type="search"
                            placeholder="SEARCH FOR AN EVENT"
                            aria-label="Search"
                            style={{ minWidth: "125px", width: "100%" }}
                        />
                    </form>
                    <Alert />
                </Container>
            </Box>

            <Divider variant="middle" />
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={2}>
                    {[...EventsList].map(event => (
                        <Grid item key={event.event_id} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Grid container border={1}>
                                        <Grid
                                            item
                                            xs={12}
                                            style={{
                                                minHeight: "100%",
                                                borderBottom: "2px solid black",
                                                padding: "0.5rem 0"
                                            }}
                                        >
                                            <Typography
                                                className={classes.title1}
                                                variant="body1"
                                            >
                                                {event.title}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            align="center"
                                            style={{ padding: "0.5rem 0" }}
                                        >
                                            <Typography
                                                className={classes.title2}
                                                variant="body1"
                                            >
                                                {moment(
                                                    event.event_date
                                                ).format(
                                                    "MMM Do YYYY",
                                                    event.event_date
                                                )}{" "}
                                                at{" "}
                                                {convertTime(event.event_time)}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            align="center"
                                            style={{ padding: "0.5rem 0" }}
                                        >
                                            <Typography
                                                className={classes.marginBottom}
                                                variant="body1"
                                            >
                                                {event.venue_name}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            align="justify"
                                            style={{ minHeight: "5rem" }}
                                        >
                                            <Typography
                                                variant="body1"
                                                align="justify"
                                            >
                                                {event.event_description}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            align="center"
                                            style={{
                                                padding: "1rem 0 0 0",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="black"
                                                component={Link}
                                                to={{
                                                    pathname: `/events/${event.event_id}`,
                                                    state: event
                                                }}
                                            >
                                                Read more
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <ScrollTop>
                    <Tooltip
                        title="Go to Top"
                        aria-label="Go to Top button"
                        TransitionComponent={Zoom}
                    >
                        <Fab
                            color="primary"
                            size="medium"
                            aria-label="scroll back to top"
                            style={{ outline: "none" }}
                        >
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </Tooltip>
                </ScrollTop>
            </Container>
        </Box>
    );
}

EventList.propTypes = {
    eventData: PropTypes.array.isRequired
};
