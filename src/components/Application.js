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
import { ToastProvider, useToasts } from 'react-toast-notifications'
// import { FormWithToasts as Toast} from 'components/Toast';

export default function Application() { 

  const userId = sessionStorage.getItem('userId');
  const [events, setEvents]=useState([]);
  const [venues, setVenues]=useState([]); 
  const [cartItems, setCartItems] = useState([]); 

const updateQuantity = (eventId, step = -1) => {
  return () => {
    // update the event.quantity
    // update cartItems state
    const updatedCartItems = cartItems.map(item => {
      if (item.id === eventId) {
        if(step > 0) {
          item.quantity = Math.min(item.quantity + step, item.limit)
        } else {
          item.quantity = Math.max(0, item.quantity + step)
        }
        // item.quantity += step
      }
      return item
    })
    setCartItems(updatedCartItems)
  }
}
const removeCartItems = () => setCartItems([]);

  const addToCart = (eventId) => {
  //     
    // check if eventId already exists in cartItems
    const existingCartItem = getEventFromEventsByEventId(eventId, cartItems) 
      if (existingCartItem) {
      // if true, just increase the quantity
      existingCartItem.quantity = Math.min(existingCartItem.quantity + 1, existingCartItem.limit)

      const cartItemsCopy = cartItems.map(item => {
        if (item.id === existingCartItem.id) {
          return {
            ...item,
            ...existingCartItem
          }
        }
        return item;
      })

      setCartItems(cartItemsCopy)

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

    return (
      <ToastProvider>
      <AlertState>
        <Router>
          <div>
            <CssBaseline />
            <Header cartItems={cartItems} />
              <Switch>
                <Route exact path="/">
                  <MainPage events={events} cartItems={cartItems} addToCart={addToCart}/>
                </Route>
                <Route path="/login">
                  {userId ? <Redirect to="/" /> : <Login />}
                </Route>               
                <Route path="/signup">
                  {userId ? <Redirect to="/" /> : <Signup />}
                </Route>
                <Route path="/events/:id" render={(routeProps) => <EventInfo cartItems={cartItems} events={events} {...routeProps} addToCart={addToCart} />}>
                </Route>
                <Route path="/cart">
                  {!userId ? <Redirect to="/"/> : (routeProps) => 
                    <Cart cartItems={cartItems} updateQuantity={updateQuantity} removeCartItems={removeCartItems} {...routeProps}/>
                  }
                </Route>
                <Route path="/checkout">
                {!userId ? <Redirect to="/"/> : (routeProps) => 
                    <Checkout cartItems={cartItems} removeCartItems={removeCartItems} {...routeProps}/>
                  }
                </Route>
                <Route path="/order"> 
                  <Order/>
                </Route> 
              </Switch>
            <Footer />
          </div>
        </Router>
      </AlertState>
      </ToastProvider>
    );  
}

    
