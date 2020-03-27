import { useState } from "react";
import React from 'react';
import { Redirect } from "react-router-dom";

import Layout from "components/Layout";
import Row from "components/prebuilt/Row";
import CheckoutForm from "components/CheckoutForm";
import {formatPrice, totalPrice } from "components/Cart"

const MainPage = ({cartItems, removeCartItems}) => {
  const [redirect, setRedirect] = useState(false)

 
  if(redirect) {
    return <Redirect to="/order" />
  }
  return (
    <>
      <CheckoutForm 
        cartItems={cartItems}
        price={totalPrice(cartItems).toFixed(2)}
        onSuccessfulCheckout={() => {setRedirect(true);
          removeCartItems();
        }}
      />
      </>
  );
};

export default MainPage;