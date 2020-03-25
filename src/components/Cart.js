import React, { useEffect, useState } from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import Button from "@material-ui/core/Button";
import CardSection from './CardSection';
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import useStyles from "./EventListStyles.js";
import CreditCardIcon from '@material-ui/icons/CreditCard';
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

const events = [
    {sku: 'sku_GwjMoUH1KxmpRo', quantity: 1, price: 400, title: '2020 Town Hall'},
    {sku: 'sku_GwjM1c7VqVQt1G', quantity: 1, price: 300, title: '2020 Employment hunt workshop'},
    {sku: 'sku_GwjLIMpO76pI0n', quantity: 1, price: 200, title: 'Feb 1st - Employment hunt workshop'},
    {sku: 'sku_GwjLz1G30ryu9A', quantity: 1, price: 100, title: 'Feb 15 - Employment hunt workshop'}

]
function formatPrice (price) {
    return `$${(price/100).toFixed(2)}`
}

function totalPrice(events) {
    return events.reduce((acc, event) => acc + event.quantity * event.price, 0)
}
export default function Cart ( {cartItems}) {
    //Thomas
    const stripe = useStripe();
    const elements = useElements();
    const classes = useStyles();
    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make  sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      const card = elements.getElement(CardElement);
      const result = await stripe.createToken(card);
        if (result.error) {
          // Show error to your customer.
          console.log('token error', result.error.message);
        } else {
          // Send the token to your server.
          // This function does not exist yet; we will define it in the next step.
          console.log(result.token, "our token")
          stripeTokenHandler(result.token);
        }
      };

      async function stripeTokenHandler(token) {
        const paymentData = {token: token.id};
      
        // Use fetch to send the token ID and any other payment data to your server.
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const response = await fetch('/charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentData),
        });
      
        // Return and display the result of the charge.
        return response.json();
      }

    //   const cartItem = {
    //     event_id: event.event_id,
    //     product: event.description,
    //     quantity: 1,
    //     unitPrice: event.price,
    //     subTotal: event.price
    //   }
    return (
        <div>
            <h1>My Cart</h1>
            <section>
               <div>
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
                            {cartItems.map(event => 
                            <tr>
                                <td>{event.title}</td>
                                <td>{formatPrice(event.price * 100) }</td>
                                <td>{event.quantity}</td>
                                <td>{event.limit}</td>
                                <td>{formatPrice(event.quantity * event.price * 100)}</td>
                            </tr>
                            )}
                            <tr>
                                <td style={{textAlign: "right"}} colSpan={4}>Total Price</td>
                                <td>{formatPrice(totalPrice(cartItems) * 100)}</td>
                            </tr>
                            {/* <tr>
                                <td colSpan={4}> */}
                                    {/* <form onSubmit={handleSubmit}> */}
                                        {/* <CardSection /> */}
                                    {/* </form> */}
                                {/* </td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </section>
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
                                    variant="outlined"
                                    color="primary"
                                    component={Link}
                                    to={"/checkout"}
                                    aria-label="delete"
                                    endIcon={<CreditCardIcon />}
                                >
                                   Checkout
                                </Button>
        </div>
        
    )
}



