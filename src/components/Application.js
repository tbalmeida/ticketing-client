import React from "react";
// import Footer from './components/Footer.js'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./MainPage";
import Login from "./Login";
import Signup from "./Signup";
import EventInfo from "./EventInfo";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Order from "./Order";
import Header from "./Header";
import CssBaseline from '@material-ui/core/CssBaseline';


import "components/Application.scss";

export default function Application() { 
  // const userId = sessionStorage.getItem('userId')
  const userId = null;

    return (
        <Router>
          <div>
            <Header />
              <Switch>
                <Route exact path="/">
                  <MainPage/>
                </Route>
                <Route path="/login">
                  {userId ? <Redirect to="/" /> : <Login />}
                </Route>               
                <Route path="/signup">
                  {userId ? <Redirect to="/" /> : <Signup />}
                </Route>
                <Route path="/event/:id">
                  <EventInfo/>
                </Route>
                <Route path="/cart">
                  <Cart/>
                </Route>
                <Route path="/checkout">
                  <Checkout/>
                </Route>
                <Route path="/order">
                  <Order/>
                </Route>
              </Switch>
          </div>
        </Router>
    );  
}

    
