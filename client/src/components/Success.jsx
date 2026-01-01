import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: green;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 18px;
  margin: 5px 0;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
`;

const Success = () => {
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get("reference");

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>🎉 Payment Successful!</Title>
        <Text>Your order has been placed successfully.</Text>
        <Text>Thank you for shopping with us.</Text>
        <Link to="/">
          <Button>Go to Home</Button>
        </Link>
        {reference && (
          <p className="payment-success-reference">
            <strong>Reference ID:</strong>
            {reference}
          </p>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Success;
