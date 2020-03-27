import { useState } from "react";
import React from 'react';
import { Redirect } from "react-router-dom";

import CheckoutForm from "components/CheckoutForm";
import {totalPrice } from "components/Cart"

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