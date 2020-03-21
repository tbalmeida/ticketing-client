import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import "index.scss";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Application from "components/Application";

// const stripePromise = loadStripe("pk_test_Ai6UIyP2tbBXxsisSjUcXCKm00UfGStLmk");
// 
const theme = createMuiTheme({  palette: {    primary: { main: '#ff5826', secondary: '#ff6795'  }}}) //default primary and secondary color of font The theme specifies the color of the components, darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc.

ReactDOM.render(
  // <Elements stripe = {stripePromise}>
    <BrowserRouter >
      <MuiThemeProvider theme={theme}> {/* creating a new theme and using the theme from above */}
        <CssBaseline /> {/* it's like a normalization.js file */}
        < Application stripeToken="pk_test_Ai6UIyP2tbBXxsisSjUcXCKm00UfGStLmk" />
      </MuiThemeProvider>
    </BrowserRouter>,
  // </Elements>,
  document.getElementById('root')
);

