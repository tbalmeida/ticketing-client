import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MainPage, { getData } from "./MainPage";
import Signup from "./Signup";
import EventInfo, { getEventFromEventsByEventId } from "./EventInfo";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Order from "./Order";
import Header from "./Header";
import { Login } from "./Login";
import Footer from "./Footer";
import CssBaseline from '@material-ui/core/CssBaseline';
import "components/Application.scss";
import { AlertState } from './context/alert/AlertState'

export default function Application() { 

  const userId = sessionStorage.getItem('userId');
  const [users, setUsers]=useState([]);
  const [events, setEvents]=useState([]);
  const [venues, setVenues]=useState([]); 
  const [cartItems, setCartItems] = useState([]); 
  const addToCart = (eventId) => {
    
    // check if eventId already exists in cartItems
    const existingCartItem = getEventFromEventsByEventId(eventId, cartItems)
      if (existingCartItem) {
      // if true, just increase the quantity
      existingCartItem.quantity++;
      existingCartItem.subTotal += existingCartItem.unitPrice;

      // const cartItemsCopy = cartItems.map(item => {
      //   if (item.event_id === existingCartItem.event_id) {
      //     return {
      //       ...item,
      //       ...existingCartItem
      //     }
      //   }
      //   return item;
      // })

    } else {
      // otherwise, create new cartItem and add it to cartItems
      
      const event = getEventFromEventsByEventId(eventId, events);

      const cartItem = {
        id: event.event_id,
        title: event.title,
        quantity: 1,
        price: event.price.split("$")[1],
        limit: event.limit_per_user
      }
      setCartItems(cartItems.concat(cartItem))
    }
  }
    useEffect(() => {
        Promise.all([
            
         getData('/events'),
         getData('/venues'),
        ])
          .then((all) => {
          
            const [events, venues] = all;
            setEvents(events.data);
            setVenues(venues.data);
          })
          .catch(err => {
            console.error('ERRRROROROROR', err)
          })
      }, [])

    //   const stripe = useStripe()
    //   console.log("Application -> stripe", stripe)
    // const elements = useElements()
    // console.log("Application -> elements", elements)

    // React.useEffect(()=> {
    //     console.log(stripe, elements)
    // }, [stripe, elements])
    return (
      <AlertState>
        <Router>
          <div>
            <CssBaseline />
            <Header cartItems={cartItems}/>
              <Switch>
                <Route exact path="/">
                  <MainPage events={events}/>
                </Route>
                <Route path="/login">
                  {userId ? <Redirect to="/" /> : <Login />}
                </Route>               
                <Route path="/signup">
                  {userId ? <Redirect to="/" /> : <Signup />}
                </Route>
                <Route path="/events/:id" render={(routeProps) => <EventInfo events={events} {...routeProps} addToCart={addToCart} />}>
                </Route>
                <Route path="/cart">
                  {!userId ? <Redirect to="/"/> : (routeProps) => 
                    <Cart cartItems={cartItems} {...routeProps}/>
                  }
                </Route>
                <Route path="/checkout">
                {!userId ? <Redirect to="/"/> : (routeProps) => 
                    <Checkout cartItems={cartItems} {...routeProps}/>
                  }
                </Route>
                <Route path="/order"> }
                  <Order/>
                </Route> 
              </Switch>
            <Footer />
          </div>
        </Router>
      </AlertState>
    );  
}

    
