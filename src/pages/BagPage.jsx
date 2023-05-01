import { useContext, useEffect, useState } from "react";
import { HeaderDataContext } from "../App";
import styled from "styled-components";
import api from "../services/api";
import BagContent from "../components/BagPage/BagContent";
import Checkout from "../components/BagPage/Checkout";

export default function BagPage() {
  const [bag, setBag] = useState(undefined);
  const [totalAmount, setTotalAmount] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

  function totalAmountCalc(userBag) {
    if (userBag.length === 0) return setTotalAmount(0);

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
      <BagContent
        bag={bag}
        setBag={setBag}
        totalAmount={totalAmount}
        showCheckout={showCheckout}
        setShowCheckout={setShowCheckout}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <Checkout
        showCheckout={showCheckout}
        setShowCheckout={setShowCheckout}
        refresh={refresh}
        setRefresh={setRefresh}
      />
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
