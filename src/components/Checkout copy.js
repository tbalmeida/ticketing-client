import React, { useEffect, useState } from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import Button from "@material-ui/core/Button";
import CardSection from './CardSection';

import { Link } from "react-router-dom";
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


      

// Here
    // const [stripe, setStripe] = useState(null)
    // //
    // // const stripe = useStripe()
    // console.log("Cart -> stripe", stripe)
    // // const elements = useElements()
    // // console.log("Cart -> elements", elements)

    // useEffect(()=> {
    //     if(window.Stripe) {
    //         setStripe(window.Stripe(stripeToken))
    //     }
    // }, [stripeToken])
    // console.log("Cart -> Stripe", stripe)

    // function checkout() {
    //     stripe.redirectToCheckout({
    //       events: events.map(event => ({
    //         quantity: event.quantity,
    //         sku: event.sku
    //       })),
    //       successUrl: "https://your-website.com/success",
    //       cancelUrl: "https://your-website.com/canceled"
    //     })
    //   }
//Here

    return (
        <div>
            <h1>Checkout</h1>
            <section>
               <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Event Price </th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>

                        <tbody>
                            {events.map(event => 
                            <tr>
                                <td>{event.title}</td>
                                <td>{formatPrice(event.price)}</td>
                                <td>{event.quantity}</td>
                                <td>{formatPrice(event.quantity * event.price)}</td>
                            </tr>
                            )}
                            <tr>
                                <td style={{textAlign: "right"}} colSpan={3}>Total Price</td>
                                <td>{formatPrice(totalPrice(events))}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <form onSubmit={handleSubmit}>
                                        <CardSection />
                                        <button disabled={!stripe}>Checkout now</button>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <p>
                <Link to="/">Go Home</Link>
            </p>
            <p>
                <Link to="/checkout">Checkout</Link>
            </p>
        </div>
        
    )
}




// export default function Cart({ cartItems }) {
//   console.log('CartItems', cartItems)
//     return (
//         <div>
//             <h1>My Cart</h1>
//             <p>Product Infomation</p>
//             <section class="cart-show">
//                 <div class="panel panel-default items">
//                     <table class="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th colspan="2">Event</th>
//                                 <th>Event Price </th>
//                                 <th>Quantity</th>
//                                 <th>Subtotal</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>Image1</td>
//                                 <td>Some event1</td>
//                                 <td>20CAD</td>
//                                 <td>2</td>
//                                 <td>40CAD</td>
//                             </tr>
//                             <tr>
//                                 <td>Image2</td>
//                                 <td>Some event2</td>
//                                 <td>30CAD</td>
//                                 <td>3</td>
//                                 <td>90CAD</td>
//                             </tr>
//                         </tbody>
//                         <tfoot>
//                             <tr>
//                                 <th colspan="4">TOTAL:</th>
//                                 <th>130CAD</th>
//                             </tr>
//                         </tfoot>
//                     </table>
//                 </div>
//             </section>
//         </div>
//     );
// }