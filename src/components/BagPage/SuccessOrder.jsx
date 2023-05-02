import styled from "styled-components";
import successImage from "../../assets/successImage/success.png";
import { useNavigate } from "react-router-dom";

export default function SuccessOrder() {
  const navigate = useNavigate();

  function continueShopping() {
    navigate("/home")
  }

  return (
    <SuccessContainer>
      <img src={successImage} alt="" />
      <h1>Success!</h1>
      <p>Your order will be delivered soon.</p>
      <p>Thank you for choosing our app</p>
      <button onClick={continueShopping}>CONTINUE SHOPPING</button>
    </SuccessContainer>
  );
}

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  color: #000000;

  img {
    margin-top: 60px;
  }

  h1 {
    margin-top: 48px;
    margin-bottom: 12px;
    font-size: 34px;
    line-height: 34px;
  }

  p {
    font-size: 14px;
    line-height: 150%;
  }

  button {
    width: 100%;
    background: #3c3736;
    box-shadow: 0px 4px 8px rgba(211, 38, 38, 0.25);
    border-radius: 25px;
    height: 48px;
    border-style: none;
    color: #ffffff;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-top: 80px;
    margin-bottom: 0px;
  }
`;
