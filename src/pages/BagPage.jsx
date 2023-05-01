import { useContext, useEffect, useState } from "react";
import { HeaderDataContext } from "../App";
import styled from "styled-components";
import axios from "axios";
import api from "../services/api";
import BagContent from "../components/BagPage/BagContent";

export default function BagPage() {
  const [bag, setBag] = useState(undefined);
  const [totalAmount, setTotalAmount] = useState(null);

  const { setSelecionado } = useContext(HeaderDataContext);
  useEffect(() => {
    setSelecionado("Bag");
    async function getUserBag() {
      try {
        const { data: userBag } = await api.getBag();
        setBag(userBag);
        totalAmountCalc(userBag);
      } catch (err) {
        console.log(err);
      }
    }
    getUserBag();
  }, []);

  function totalAmountCalc(userBag) {
    const totalPricePerSku = userBag.map((sku) => ({
      price: sku.price.cents,
      discount: 1 - sku.price.discount / 100,
      quantity: sku.quantity,
      totalPricePerSku:
        sku.price.cents * (1 - sku.price.discount / 100) * sku.quantity,
    }));

    const totalAmountCalc = totalPricePerSku.reduce((acc, curr) => {
      return acc + curr.totalPricePerSku;
    }, 0);

    const finalTotalAmount = (totalAmountCalc / 100).toFixed(2);

    return setTotalAmount(finalTotalAmount);
  }

  return (
    <BagContainer>
      <h1>My Bag</h1>
      {bag !== undefined &&
        bag.map((product) => {
          return (
            <BagContent
              key={product.productId}
              productId={product.productId}
              title={product.title}
              color={product.color}
              price={product.price}
              size={product.size}
              productQuantity={product.quantity}
              thumbnail={product.thumbnail}
              setBag={setBag}
            />
          );
        })}
      <CheckoutContainer>
        <div>
          <p>Total amount:</p>
          <h3>${totalAmount}</h3>
        </div>
        <button>CHECK OUT</button>
      </CheckoutContainer>
    </BagContainer>
  );
}

const BagContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin-top: 63px;
  padding: 0px 12px;
  background-color: white;
  font-family: Montserrat;

  h1 {
    font-size: 34px;
    line-height: 34px;
    letter-spacing: 0em;
    text-align: left;
    color: #222222;
    font-weight: bold;
    margin-bottom: 24px;
  }
`;

const CheckoutContainer = styled.div`
  width: 100%;
  height: 94px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* margin-bottom: 12vh; */
  padding: 0px 12px;
  position: fixed;
  bottom: 12vh;
  margin-bottom: 10px;
  left: 0;
  z-index: 1;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      color: #9b9b9b;
      font-size: 14px;
      line-height: 20px;
    }
    h3 {
      color: #222222;
      font-size: 20px;
      font-weight: bold;
      line-height: 22px;
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
  }
`;
