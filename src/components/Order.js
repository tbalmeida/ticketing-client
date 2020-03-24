import styled from "@emotion/styled";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import React from 'react';

import Layout from "components/Layout.jsx";
import Row from "../components/prebuilt/Row";

const Container = styled.div`
  width: 575px;
  margin: 30px auto 0 auto;
  text-align: center;
  color: red;
`;

const Title = styled.div`
  font-size: 58px;
`;

const Message = styled.div`
  margin-top: 40px;
  font-size: 24px;
`;

export default () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 100);
  });

  return (
      <Container>
        <Confetti width={width} height={height} numberOfPieces={450} />
        <Title>Congrats!</Title>
        <Message>Stripe has successfully processed your payment</Message>
      </Container>
  );
};

// import React from "react";
// import { Link } from "react-router-dom";
// export default function Order() {
//     return (
//         <div>
//             <h1>Cart</h1>
//             <p>Product Infomation</p>
//             <section class="cart-show">
//                 <div class="panel panel-default items">
//                     <table class="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th colspan="2">Product</th>
//                                 <th>Unit Price</th>
//                                 <th>Quantity</th>
//                                 <th>Price</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>Image1</td>
//                                 <td>Some event1</td>
//                                 <td>20CAD</td>
//                                 <td>2</td>
//                                 <td>40CAD</td>
//                             </tr>
//                             <tr>
//                                 <td>Image2</td>
//                                 <td>Some event2</td>
//                                 <td>30CAD</td>
//                                 <td>3</td>
//                                 <td>90CAD</td>
//                             </tr>
//                         </tbody>
//                         <tfoot>
//                             <tr>
//                                 <th colspan="4">TOTAL:</th>
//                                 <th>130CAD</th>
//                             </tr>
//                         </tfoot>
//                     </table>
//                 </div>
//             </section>
//             <p>Thank you for your order!
//                 Email used for this order is "blabla@gmail.com"</p>
//             <p>
//                 <Link to="/">Go Home</Link>
//             </p>
//         </div>
//     );
// }
