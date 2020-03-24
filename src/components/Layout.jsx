import Head from "next/head";
import styled from "@emotion/styled";
import GlobalStyles from "./prebuilt/GlobalStyles";
import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Learning
// To best leverage Stripe’s advanced fraud functionality,
// include this script on every page, not just the checkout page.
// This allows Stripe to detect anomalous behavior that may be indicative
// of fraud as customers browse your website.
// Note: This is why we are adding it to a Layout component.

// const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);

// TIP
// call loadStripe outside of a component
// in that way there's no chance it will get
// called more times than it needs to

// const Layout = ({ children, title }) => {
//   return (
//     <>
//       <GlobalStyles />
//      {children}
//     </>
//   );
// };

// export default Layout;
