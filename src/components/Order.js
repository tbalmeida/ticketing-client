import styled from "@emotion/styled";
import React from 'react';

const Container = styled.div`
  // width: 575px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  color: black;
  min-height: 90vh;
  background-image: url(components/img/handshake.jpg);
`;

const Title = styled.div`
  font-size: 58px;
`;

const Message = styled.div`
  margin-top: 40px;
  font-size: 36px;
`;

export default () => {
  
  return (
      <Container id='orderWrapper'>
        <Title>Congrats!</Title>
        <Message>Stripe has successfully processed your payment</Message>
      </Container>
  );
};
