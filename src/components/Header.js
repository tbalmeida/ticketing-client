import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Avatar from "@material-ui/core/Avatar";
import logo from "./img/ticket-logo-png-clip-art2.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
import { Collapse } from "@material-ui/core";

const userId = sessionStorage.getItem("userId"); //native sessionStorage
const uName = sessionStorage.getItem("uName"); //we use uName because when we login or signup we use setItem and give it this specific 'uName'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        fontWeight: 700,
        textTransform: "uppercase"
    },
    buttonStyle: {
        margin: "5px",
        color: "inherit",
        "&:hover": {
            border: "#8b8e94 solid 1px"
        }
    },
    small: {
        //small here is just a small tag of html
        width: theme.spacing(3),
        height: theme.spacing(3)
    }
}));

const logoutFunction = () => sessionStorage.clear(); //removing all data from sessionStorage

function HideOnScroll(props) {
    //hide the upper panel with login, signup etc when approaching the bottom of the page
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func
};

export default function Header({ cartItems }) {
    const classes = useStyles();
    const cartTotalQuantity = cartItems.reduce((sum, cartItem) => {
        const quantity = cartItem.quantity;
        sum += quantity;
        return sum;
    }, 0);

    return (
        <Box className={classes.root} marginTop={10}>
            <HideOnScroll>
                <AppBar>
                    <Toolbar id="back-to-top">
                        <Tooltip
                            title="Home"
                            aria-label="Home button"
                            TransitionComponent={Zoom}
                            placement="bottom"
                        >
                            <Button
                                className={classes.buttonStyle}
                                component={Link}
                                to={"/"}
                            >
                                Home
                            </Button>
                        </Tooltip>
                        <Typography
                            align="center"
                            variant="h4"
                            className={classes.title}
                        >
                            Ticketing 4 Good
                        </Typography>
                        {userId ? (
                            <>
                                <Avatar
                                    style={{ marginRight: "5px" }}
                                    className={classes.small}
                                />
                                {uName}
                                <Tooltip
                                    title="Logout"
                                    aria-label="Logout button"
                                    TransitionComponent={Zoom}
                                    placement="bottom"
                                >
                                    <Button
                                        style={{ margin: "0 1.5rem" }}
                                        className={classes.buttonStyle}
                                        onClick={logoutFunction}
                                        href="/"
                                    >
                                        Logout
                                    </Button>
                                </Tooltip>
                                <Badge
                                    style={{ color: "black" }}
                                    component={Link}
                                    to={"/cart"}
                                    size="large"
                                    badgeContent={
                                        cartItems[0]
                                            ? `${cartTotalQuantity}`
                                            : null
                                    }
                                >
                                    <ShoppingCartIcon></ShoppingCartIcon>
                                </Badge>
                            </>
                        ) : (
                            <>
                                <Tooltip
                                    title="Login"
                                    aria-label="Login button"
                                    TransitionComponent={Zoom}
                                    placement="bottom"
                                >
                                    <Button
                                        className={classes.buttonStyle}
                                        href="/login"
                                    >
                                        Login
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    title="Sign up"
                                    aria-label="Sign up button"
                                    TransitionComponent={Collapse}
                                    placement="bottom"
                                >
                                    <Button
                                        className={classes.buttonStyle}
                                        href="/signup"
                                    >
                                        Signup
                                    </Button>
                                </Tooltip>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </Box>
    );
}
