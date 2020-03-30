import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import "index.scss";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import GlobalStyles from "components/prebuilt/GlobalStyles";
import Application from "components/Application";
import axios from 'axios';

const stripePromise = loadStripe("pk_test_Ai6UIyP2tbBXxsisSjUcXCKm00UfGStLmk");
// const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);


if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
} else {
  axios.defaults.baseURL = 'https://radiant-escarpment-02459.herokuapp.com/'
}

const theme = createMuiTheme({  palette: {    primary: { main: '#f7faf1', secondary: '#ff6795'  }}}) //default primary and secondary color of font The theme specifies the color of the components, darkness of the surfaces, level of shadow, appropriate opacity of ink elements, etc.
const App = () => (
  <>
  <GlobalStyles />
    <BrowserRouter >
      <MuiThemeProvider theme={theme}> {/* creating a new theme and using the theme from above */}
        <CssBaseline /> {/* it's like a normalization.js file */}
        <Elements stripe={stripePromise}>
          <Application />
        </Elements>
      </MuiThemeProvider>
    </BrowserRouter>
    </>
   )
ReactDOM.render(
  <App />,
  document.getElementById('root')
);


