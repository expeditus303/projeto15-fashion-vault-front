import { useContext, useEffect, useState, lazy, Suspense } from "react";
import { HeaderDataContext } from "../App";
import styled from "styled-components";
import api from "../services/api";
import BagContent from "../components/BagPage/BagContent";
import SuccessOrder from "../components/BagPage/SuccessOrder";
import AddAddress from "../components/BagPage/AddAddress";
import AddPayment from "../components/BagPage/AddPayment";
import { useNavigate } from "react-router-dom";
const Checkout = lazy(() => import("../components/BagPage/Checkout"));

export default function BagPage() {
  const [bag, setBag] = useState(undefined);
  const [orderAmount, setOrderAmount] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  const { setSelecionado } = useContext(HeaderDataContext);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  console.log(token)

  useEffect(() => {
    setSelecionado("Bag");
   
    if (!token) return navigate("/");

    async function getUserBag() {
      try {
        const { data: userBag } = await api.getBag(token);
        setBag(userBag);
        totalAmountCalc(userBag);
      } catch (err) {
        console.log(err);
      }
    }
    getUserBag();
  }, [refresh]);

  function totalAmountCalc(userBag) {
    if (userBag.length === 0) return setOrderAmount(0);

    const totalPricePerSku = userBag.map((sku) => ({
      price: sku.price.cents,
      discount: 1 - sku.price.discount / 100,
      quantity: sku.quantity,
      totalPricePerSku:
        sku.price.cents * (1 - sku.price.discount / 100) * sku.quantity,
    }));

    const orderAmountCalc = totalPricePerSku.reduce((acc, curr) => {
      return acc + curr.totalPricePerSku;
    }, 0);

    const orderTotalAmount = (orderAmountCalc / 100).toFixed(2);

    return setOrderAmount(orderTotalAmount);
  }

  return (
    <BagContainer>
      <BagContent
        bag={bag}
        setBag={setBag}
        orderAmount={orderAmount}
        showCheckout={showCheckout}
        setShowCheckout={setShowCheckout}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      {showCheckout && (
        <Suspense>
          <Checkout
            showCheckout={showCheckout}
            setShowCheckout={setShowCheckout}
            orderAmount={orderAmount}
            refresh={refresh}
            showSuccess={showSuccess}
            setShowSucces={setShowSuccess}
            setRefresh={setRefresh}
            showAddAddress={showAddAddress}
            setShowAddAddress={setShowAddAddress}
            showAddPayment={showAddPayment}
            setShowAddPayment={setShowAddPayment}
          />
        </Suspense>
      )}

      {showSuccess && (
        <Suspense>
          <SuccessOrder
            showCheckout={showCheckout}
            setShowCheckout={setShowCheckout}
            orderAmount={orderAmount}
            refresh={refresh}
            showSuccess={showSuccess}
            setShowSucces={setShowSuccess}
            setRefresh={setRefresh}
          />
        </Suspense>
      )}

      {showAddAddress && (
        <Suspense>
          <AddAddress
            showCheckout={showCheckout}
            setShowCheckout={setShowCheckout}
            orderAmount={orderAmount}
            refresh={refresh}
            showSuccess={showSuccess}
            setShowSucces={setShowSuccess}
            setRefresh={setRefresh}
            showAddAddress={showAddAddress}
          />
        </Suspense>
      )}

      {showAddPayment && (
        <Suspense>
          <AddPayment
            showCheckout={showCheckout}
            setShowCheckout={setShowCheckout}
            orderAmount={orderAmount}
            refresh={refresh}
            showSuccess={showSuccess}
            setShowSucces={setShowSuccess}
            setRefresh={setRefresh}
            showAddAddress={showAddAddress}
          />
        </Suspense>
      )}
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
