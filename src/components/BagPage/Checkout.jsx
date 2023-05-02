import { useContext, useEffect, useState } from "react";
import { HeaderDataContext } from "../../App";
import styled from "styled-components";
import api from "../../services/api";
import mastercardLogo from "../../assets/creditCardLogos/mastercard.png";
import visaLogo from "../../assets/creditCardLogos/visa.jpg";
import fedexLogo from "../../assets/deliveryLogos/fedex.png";
import dhlLogo from "../../assets/deliveryLogos/dhl.png";
import uspsLogo from "../../assets/deliveryLogos/usps.png";

export default function Checkout(props) {
  const {
    showCheckout,
    setShowCheckout,
    orderAmount,
    refresh,
    setRefresh,
    showSuccess,
    setShowSucces,
    setShowAddAddress,
    showAddAddress,
    showAddPayment,
    setShowAddPayment,
  } = props;

  const { setHeaderButton, setHeaderTitle } = useContext(HeaderDataContext);

  const [checkoutData, setCheckoutData] = useState(undefined);

  const [deliveryAmount, setDeliveryAmount] = useState("-");

  const [totalAmount, setTotalAmount] = useState(orderAmount);

  const [creditCardLogo, setCreditCardLogo] = useState(undefined);

  const [selectedDelivery, setSelectedDelivery] = useState(undefined);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setHeaderTitle("Checkout");
    async function getCheckoutData() {
      try {
        const { data } = await api.getCheckout(token);
        setCheckoutData(data);
        checkCreditCardBrand(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getCheckoutData();
  }, [showCheckout]);

  function selectDelivery(delivery) {
    let deliveryPrice = 0;

    if (delivery === "fedex") {
      deliveryPrice = 10.0;
      setSelectedDelivery(delivery);
    }

    if (delivery === "dhl") {
      deliveryPrice = 8.0;
      setSelectedDelivery(delivery);
    }

    if (delivery === "usps") {
      deliveryPrice = 6.0;
      setSelectedDelivery(delivery);
    }

    const total = deliveryPrice + Number(orderAmount);

    setDeliveryAmount(deliveryPrice);

    return setTotalAmount(total);
  }

  function checkCreditCardBrand(data) {
    const { type: cardBrand } = data.paymentMethod[0].card;
    if (cardBrand === "mastercard") return setCreditCardLogo(mastercardLogo);
    if (cardBrand === "visa") return setCreditCardLogo(visaLogo);
  }

  function addAddress() {
    setShowAddAddress(true);
  }

  function addPayment() {
    setShowAddPayment(true);
  }

  async function submitOrder() {
    const promise = await api.createrOrder(token);
    if (promise.data) return setShowSucces(true);
  }

  if (checkoutData != undefined) {
    const { mainAddress, paymentMethod } = checkoutData;
    const [paymentData] = paymentMethod;

    console.log("aham")
    console.log(paymentData)

    return (
      <CheckoutContainer
        showCheckout={showCheckout}
        showSuccess={showSuccess}
        showAddAddress={showAddAddress}
        showAddPayment={showAddPayment}
      >
        <Title>
          <h2>Shipping address</h2>
          <h3 onClick={addAddress}>Change</h3>
        </Title>

        {Object.keys(mainAddress).length !== 0 && (
          <Content>
            <h4>{mainAddress.name}</h4>

            <p>
              {mainAddress.street}, {mainAddress.number}
            </p>
            <p>
              {mainAddress.neighborhood}, {mainAddress.city}/{mainAddress.state}{" "}
              - {mainAddress.country}
            </p>
            <p>{mainAddress.postalCode}</p>
          </Content>
        )}

        {Object.keys(mainAddress).length === 0 && (
          <EmptyContent>
            <p>Add a shipping address</p>
          </EmptyContent>
        )}

        <Title>
          <h2>Payment</h2>
          <h3 onClick={addPayment}>Change</h3>
        </Title>

        {paymentData !== undefined && (
          <Content>
          <div>
            <img src={creditCardLogo} alt="" />
            <p>**** **** **** {paymentData.card.lastFourNumbers}</p>
          </div>
        </Content>
        )}

        {paymentData === undefined && (
          <EmptyContent>
          <p>Add a payment method</p>
        </EmptyContent>
        )}

        <Title>
          <h2>Delivery method</h2>
        </Title>

        <ContentDelivrey>
          <DeliveryMethod>
            <div
              className={selectedDelivery === "fedex" && "selected"}
              onClick={() => selectDelivery("fedex")}
            >
              <div className="imageContainer">
                <img src={fedexLogo} className="fedex" />
              </div>
              <p>2-3 days</p>
            </div>
            <div
              className={selectedDelivery === "dhl" && "selected"}
              onClick={() => selectDelivery("dhl")}
            >
              <div className="imageContainer">
                <img src={dhlLogo} className="dhl" />
              </div>
              <p>2-4 days</p>
            </div>
            <div
              className={selectedDelivery === "usps" && "selected"}
              onClick={() => selectDelivery("usps")}
            >
              <div className="imageContainer">
                <img src={uspsLogo} className="usps" />
              </div>
              <p>2-5 days</p>
            </div>
          </DeliveryMethod>
        </ContentDelivrey>

        <CheckoutAmount>
          <div>
            <p>Order:</p>
            <h3>${orderAmount}</h3>
          </div>
          <div>
            <p>Delivery:</p>
            <h3>${deliveryAmount}</h3>
          </div>
          <div>
            <h4>Summary:</h4>
            <h2>${totalAmount}</h2>
          </div>
          <button onClick={submitOrder}>SUBMIT ORDER</button>
        </CheckoutAmount>
      </CheckoutContainer>
    );
  }
}

const CheckoutContainer = styled.div`
  display: ${(props) =>
    props.showCheckout &&
    !props.showSuccess &&
    !props.showAddAddress &&
    !props.showAddPayment
      ? "block"
      : "none"};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
  align-items: center;
  color: #222222;

  h3 {
    font-weight: 500;
  }
`;

const Content = styled.div`
  padding: 23px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  color: #222222;
  margin-bottom: 50px;

  h4 {
    margin-bottom: 5px;
    font-weight: bold;
  }

  p {
    margin-top: 7px;
  }

  div {
    display: flex;
    align-items: center;

    p {
      font-size: 14px;
      line-height: 150%;
      letter-spacing: -0.15px;
      color: #222222;
    }

    img {
      width: 32px;
      margin-right: 17px;
      font-size: 50px;
    }
  }
`;

const EmptyContent = styled.div`
  padding: 23px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  color: #222222;
  margin-bottom: 50px;
  height: 108px;

  h4 {
    margin-bottom: 5px;
    font-weight: bold;
  }

  p {
    margin-top: 7px;
  }

  div {
    display: flex;
    align-items: center;

    p {
      font-size: 14px;
      line-height: 150%;
      letter-spacing: -0.15px;
      color: #222222;
    }

    img {
      width: 32px;
      margin-right: 17px;
      font-size: 50px;
    }
  }
`;


const ContentDelivrey = styled.div`
  padding: 23px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  color: #222222;
  margin-bottom: 0px;
  height: 100%;

  h4 {
    margin-bottom: 5px;
    font-weight: bold;
  }

  p {
    margin-top: 7px;
  }

  div {
    display: flex;
    align-items: center;

    p {
      font-size: 14px;
      line-height: 150%;
      letter-spacing: -0.15px;
      color: #222222;
    }

    img {
      width: 32px;
      margin-right: 17px;
      font-size: 50px;
    }
  }
`;

const DeliveryMethod = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    width: 100px;
    height: 72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    img {
      margin: 0px;
    }

    .fedex {
      width: 61px;
      height: 17px;
    }

    .dhl {
      width: 71px;
      height: 16px;
    }

    .usps {
      width: 82px;
      height: 10.25px;
    }
  }

  .selected {
    border: 2px solid #222222;
  }
`;

const CheckoutAmount = styled.div`
  background-color: white;
  width: 100%;
  /* height: 154px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* margin-bottom: 12vh; */
  padding: 0px 12px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;

  div {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      color: #9b9b9b;
      font-size: 14px;
      line-height: 20px;
    }
    h2 {
      color: #222222;
      font-size: 20px;
      font-weight: bold;
      line-height: 22px;
    }

    h3 {
      color: #222222;
      font-size: 16px;
      /* font-weight: bold; */
      line-height: 22px;
    }

    h4 {
      font-size: 16px;
      line-height: 16px;
      color: #9b9b9b;
      font-weight: bold;
    }
  }
  button {
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
    margin-top: 15px;
    margin-bottom: 30px;
  }
`;

// const CheckoutContainer = styled.div`
//   background-color: white;
//   width: 100%;
//   height: 104px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   /* margin-bottom: 12vh; */
//   padding: 0px 12px;
//   position: fixed;
//   bottom: 12vh;
//   margin-bottom: 10px;
//   left: 0;
//   z-index: 1;
//   border-top-right-radius: 12px;
//   border-top-left-radius: 12px;

//   div {
//     margin-top: 10px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     p {
//       color: #9b9b9b;
//       font-size: 14px;
//       line-height: 20px;
//     }
//     h3 {
//       color: #222222;
//       font-size: 20px;
//       font-weight: bold;
//       line-height: 22px;
//     }
//   }
//   button {
//     background: #3c3736;
//     box-shadow: 0px 4px 8px rgba(211, 38, 38, 0.25);
//     border-radius: 25px;
//     height: 48px;
//     border-style: none;
//     color: #ffffff;
//     font-size: 14px;
//     line-height: 20px;
//     font-weight: bold;
//     letter-spacing: 2px;
//   }
// `;
