import { useState } from "react";
import React from 'react';
// import Router from "next/router";
import { Redirect } from "react-router-dom";

import Layout from "components/Layout";
import Row from "components/prebuilt/Row";
import DonutShop from "components/prebuilt/DonutShop";
import CheckoutForm from "components/CheckoutForm";
import getDonutPrice from "components/utils/get-donut-price";

const MainPage = props => {
  const [numDonuts, setNumDonuts] = useState(1);
  const [redirect, setRedirect] = useState(false)

  const addDonut = () => setNumDonuts(num => Math.min(12, num + 1));
  const remDonut = () => setNumDonuts(num => Math.max(1, num - 1));

  if(redirect) {
    return <Redirect to="/order" />
  }
  return (
    <>
    {/* <Layout title="Donut Shop"> */}
      <Row>
        <DonutShop
          onAddDonut={addDonut}
          onRemoveDonut={remDonut}
          numDonuts={numDonuts}
        />
      </Row>
      <CheckoutForm
        price={getDonutPrice(numDonuts)}
        onSuccessfulCheckout={() => setRedirect(true)}
      />
      </>
    // {/*  </Layout> */}
  );
};

export default MainPage;