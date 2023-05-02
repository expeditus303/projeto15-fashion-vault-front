import styled from "styled-components";
import BagProducts from "./BagProducts";
import { MagnifyingGlass } from "react-loader-spinner";
import { useContext } from "react";
import { HeaderDataContext } from "../../App";

export default function BagContent(props) {
  const {
    bag,
    setBag,
    orderAmount,
    showCheckout,
    setShowCheckout,
    refresh,
    setRefresh,
  } = props;

  const {setShowFooter} = useContext(HeaderDataContext);


  function openCheckout(){
    setRefresh(!refresh)
    setShowCheckout(true)
    setShowFooter(false)
  }

  if (bag === undefined) {
    return (
      <Loading>
        <MagnifyingGlass width={110} height={110} color="#4d3837" />
      </Loading>
    );
  }

  return (
    <BagContentContainer showCheckout={showCheckout}>
      <h1>My Bag</h1>
      {bag !== undefined &&
        bag.map((product) => {
          return (
            <BagProducts
              key={product.productId}
              productId={product.productId}
              title={product.title}
              color={product.color}
              price={product.price}
              size={product.size}
              productQuantity={product.quantity}
              thumbnail={product.thumbnail}
              setBag={setBag}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          );
        })}
      <CheckoutContainer>
        <div>
          <p>Total amount:</p>
          <h3>${orderAmount}</h3>
        </div>
        <button onClick={openCheckout}>CHECK OUT</button>
      </CheckoutContainer>
    </BagContentContainer>
  );
}

const BagContentContainer = styled.div`
  display: ${(props) => (props.showCheckout ? "none" : "block")};
`;

const CheckoutContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 104px;
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

const Loading = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35vh;
`;