import React, { useEffect, useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CardSection from "./CardSection";
import HomeIcon from "@material-ui/icons/Home";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import useStyles from "./EventListStyles.js";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { SHOW_ALERT } from "./context/types";
import { AlertContext } from "components/context/alert/alertContext";
import { Alert } from "components/Alert";
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

export function formatPrice(price) {
    return `$${(price / 100).toFixed(2)}`;
}

export function totalPrice(events) {
    return events.reduce((acc, event) => acc + event.quantity * event.price, 0);
}
export default function Cart({ cartItems, updateQuantity, removeCartItems }) {
    console.log("Cart -> cartItems", cartItems)
    const { show, hide } = useContext(AlertContext);

    useEffect(() => {
    if(cartItems.length === 0) {
        show('The cart is empty!', 'danger')
    } 
  }, []);
   
    function totalPrice1(events) {
        return events.reduce((acc, event) => acc + event.quantity * event.price, 0);
    }
    const classes = useStyles();

    return (
        <div>
            <h1>My Cart</h1>
            <section>
                <div>

            {cartItems.length===0 ? <Alert/> :
                    <table>
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Event Price </th>
                                <th>Quantity</th>
                                <th>Limit per user</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cartItems.map(event => (
                                <tr key={event.id}>
                                    <td>{event.title}</td>
                                    <td>{formatPrice(event.price * 100)}</td>
                                    <td style={{ display: "flex" }}>
                                        {event.quantity}
                                        <Badge max={5}
                                            color="secondary"
                                            badgeContent={event.quantity}
                                        >
                                            <ShoppingCartIcon />
                                        </Badge>
                                        <div class>
                                            <ButtonGroup>
                                                <Button
                                                    size="small"
                                                    aria-label="reduce"
                                                    onClick={updateQuantity(event.id)}
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </Button>
                                                <Button
                                                    size="small"
                                                    aria-label="increase"
                                                    onClick={updateQuantity(event.id, 1)}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </td>
                                    <td>{event.limit}</td>
                                    <td>
                                        {formatPrice(
                                           event.quantity * event.price * 100
                                        )}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td style={{ textAlign: "right" }} colSpan={4}>
                                    Total Price
                                </td>
                                <td>
                                    {formatPrice(totalPrice1(cartItems) * 100)}
                                </td>
                            </tr>
                        </tbody>
                    </table>}
                </div>
            </section>
            <Button
                className={classes.margin}
                variant="outlined"
                size="small"
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
                variant="outlined"
                color="primary"
                component={Link}
                to={"/checkout"}
                aria-label="delete"
                endIcon={<CreditCardIcon />}
            >
                Checkout
            </Button>
            <Button
                className={classes.margin}
                variant="outlined"
                size="small"
                onClick={removeCartItems}
                variant="outlined"
                color="primary"
                component={Link}
                to={"/"}
                aria-label="delete"
                endIcon={<CreditCardIcon />}
            >
                Clear cart
            </Button>
        </div>
    );
}
