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
import logo from "./img/tickets-logo.png";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
        flexGrow: 1
    },
    buttonStyle: {
        margin: "5px",
        color: "inherit",
        "&:hover": {
            color: "white",
            border: "#8b8e94 solid 1px"
        }
    },
    small: { //small here is just a small tag of html
        width: theme.spacing(3),
        height: theme.spacing(3)
    }
}));

const logoutFunction = () => sessionStorage.clear(); //removing all data from sessionStorage

function HideOnScroll(props) { //hide the upper panel with login, signup etc when approaching the bottom of the page
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
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

export default function ButtonAppBar({cartItems}) {
    const classes = useStyles();
    const cartTotalQuantity = cartItems.reduce((sum, cartItem) => {
        const quantity = cartItem.quantity;
        sum += quantity;
        return sum;
    }, 0);

    return (
        <Box className={classes.root} maxWidth="xs" marginTop={10}>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <Typography>
                            <img src={logo} alt="site logo" height={40} />
                        </Typography>
                        <Tooltip
                            title="Home"
                            aria-label="Home button"
                            TransitionComponent={Zoom}
                            placement="bottom"
                        >
                            <Button className={classes.buttonStyle} href="/">
                                Home
                            </Button>
                        </Tooltip>
                        <Typography
                            variant="h6"
                            className={classes.title}
                        ></Typography>
                        {userId ? (
                            <>
                                <Avatar
                                    src="/human.png"
                                    style={{ marginRight: "5px" }}
                                    className={classes.small}
                                />
                                {uName}
                                <ShoppingCartIcon>add_shopping_cart</ShoppingCartIcon>
                                {cartItems[0] ? `( ${cartTotalQuantity} )` : null}
                                <Tooltip
                                    title="Logout"
                                    aria-label="Logout button"
                                    TransitionComponent={Zoom}
                                    placement="bottom"
                                >
                                    <Button
                                        className={classes.buttonStyle}
                                        onClick={logoutFunction}
                                        href="/"
                                    >
                                        Logout
                                    </Button>
                                </Tooltip>
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
                                    TransitionComponent={Zoom}
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
