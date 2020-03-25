import { useState } from "react";
import React from 'react';
// import Router from "next/router";
import { Redirect } from "react-router-dom";

import Layout from "components/Layout";
import Row from "components/prebuilt/Row";
import DonutShop from "components/prebuilt/DonutShop";
import CheckoutForm from "components/CheckoutForm";
import getDonutPrice from "components/utils/get-donut-price";
import {formatPrice, totalPrice } from "components/Cart"
const MainPage = ({cartItems}) => {
  const [numDonuts, setNumDonuts] = useState(1);
  const [redirect, setRedirect] = useState(false)

  const addDonut = () => setNumDonuts(num => Math.min(12, num + 1));
  const remDonut = () => setNumDonuts(num => Math.max(1, num - 1));

  if(redirect) {
    return <Redirect to="/order" />
  }
  return (
    <>
      <CheckoutForm 
        cartItems={cartItems}
        price={totalPrice(cartItems).toFixed(2)}
        onSuccessfulCheckout={() => setRedirect(true)}
      />
      </>
  );
};

export default MainPage;