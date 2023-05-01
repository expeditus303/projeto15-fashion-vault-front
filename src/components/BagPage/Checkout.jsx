import { useContext, useEffect, useState } from "react";
import { HeaderDataContext } from "../../App";
import styled from "styled-components";
import api from "../../services/api";

export default function Checkout(props) {
  const { showCheckout, setShowCheckout, refresh, setRefresh } = props;

  const { setHeaderButton, setHeaderTitle } = useContext(HeaderDataContext);

  const [checkoutData, setCheckoutData] = useState(undefined);

  const PAYMENT_MOCK = [
    {
      _id: "644ac67cdb3a65eb2c976212",
      name: "Ricardo Lima",
      email: "ricardo@gmail.com",
      mainAddress: {
        name: "Ricardo",
        street: "Rua Joaquim",
        number: "301",
        neighborhood: "Centro",
        city: "Drivenópolis",
        state: "RJ",
        country: "Brazil",
        postalCode: "84564-781",
      },
      paymentMethod: [
        {
          _id: "644fc753fa0637c919ec4da2",
          userId: "644ac67cdb3a65eb2c976212",
          method: "Credit",
          status: "Verified",
          card: {
            type: "visa",
            holderName: "Ricardo",
            lastFourNumbers: "4242",
            expiryMonth: "12",
            expiryYear: "2031",
            cvvVerified: true,
          },
        },
      ],
    },
  ];

  useEffect(() => {
    setHeaderTitle("Checkout");
    async function getCheckoutData() {
      try {
        const { data } = await api.getCheckout();
        setCheckoutData(data[0]);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getCheckoutData();
  }, [showCheckout]);

  if (checkoutData != undefined) {
    const { mainAddress, paymentMethod } = checkoutData;
    const [paymentData] = paymentMethod;

    return (
      <CheckoutContainer showCheckout={showCheckout}>
        <Title>
          <h2>Shipping address</h2>
          <h3>Change</h3>
        </Title>
        <Content>
          <h4>{mainAddress.name}</h4>

          <p>
            {mainAddress.street}, {mainAddress.number}
          </p>
          <p>
            {mainAddress.neighborhood}, {mainAddress.city}/{mainAddress.state} -{" "}
            {mainAddress.country}
          </p>
          <p>{mainAddress.postalCode}</p>
        </Content>

        <Title>
          <h2>Payment</h2>
          <h3>Change</h3>
        </Title>

        <Content>
          <div>
            <img src="" alt="" />
            <p>**** **** **** {paymentData.card.lastFourNumbers}</p>
          </div>
        </Content>

        <Title>
          <h2>Delivery method</h2>
        </Title>

        <Content>
          <DeliveryMethod>
            <div>
              <img src="" alt="" />
              <p>2-3 days</p>
            </div>
            <div>
              <img src="" alt="" />
              <p>2-3 days</p>
            </div>
            <div>
              <img src="" alt="" />
              <p>2-3 days</p>
            </div>
          </DeliveryMethod>
        </Content>
      </CheckoutContainer>
    );
  }
}

const CheckoutContainer = styled.div`
  display: ${(props) => (props.showCheckout ? "block" : "none")};
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
  background-color: deeppink;
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

    p {
      font-size: 14px;
      line-height: 150%;
      letter-spacing: -0.15px;
      color: #222222;
    }

    img {
      background-color: red;
      width: 64px;
      margin-right: 17px;
    }
  }
`;

const DeliveryMethod = styled.div`
display: flex;
justify-content: space-between;
background-color: yellow;

div {
  width: 100px;
  height: 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: green;

  img {
    height: 16px;
    margin: 0px;
    align-items: center;
  }
}
  
`

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
