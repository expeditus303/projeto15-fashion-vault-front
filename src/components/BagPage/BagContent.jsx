import { useState } from "react";
import styled from "styled-components";
import api from "../../services/api";
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function BagContent(props) {
  const {
    title,
    color,
    price,
    size,
    productQuantity,
    thumbnail,
    productId,
    setBag,
  } = props;

  const [quantity, setQuantity] = useState(productQuantity);

  const priceConverted = (price.cents / 100).toFixed(2);

  async function updateQuantity(update) {
    let newQuantity = quantity;

    try {
      if (update === "decrease") {
        if (quantity === 1) {
          window.confirm("Do you want to delete this product from your bag?");
        }
        newQuantity--;
        setQuantity(newQuantity);
        const { data } = await api.updateCart("token", productId, update);
        setBag(data);
      } else if (update === "increase") {
        newQuantity++;
        setQuantity(newQuantity);
        const { data } = await api.updateCart("token", productId, update);
        setBag(data);
      }
    } catch (err) {
      if (err.response.data === "Sorry, the product you are looking for is currently out of stock") {
        newQuantity--
        setQuantity(newQuantity)
        console.log(err.response.data)
      };
    }
  }

  return (
    <ProductContainer>
      <div className="productPhoto">
        <img src={thumbnail} alt="" />
      </div>
      <div className="productData">
        <div>
          <h2>{title}</h2>
          <BsThreeDotsVertical />
        </div>
        <div>
          <div className="productColorSize">
            <p>Color: {color}</p>
            <p>Size: {size}</p>
          </div>
        </div>
        <div>
          <div className="quantity">
            <button onClick={() => updateQuantity("decrease")}>-</button>
            <input type="number" value={quantity} />
            <button onClick={() => updateQuantity("increase")}>+</button>
          </div>
          <div>${priceConverted}</div>
        </div>
      </div>
    </ProductContainer>
  );
}

const ProductContainer = styled.div`
  width: 100%;
  height: 104px;
  display: flex;
  margin-bottom: 10px;
  /* justify-content: space-between; */

  .productPhoto {
    img {
      height: 104px;
      object-fit: cover;
    }
  }

  .productData {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 11px;

    div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    .productColorSize {
      margin-bottom: 7px;
      p {
        margin-right: 16px;
      }
    }

    .quantity {
      height: 36px;
      font-size: 15px;
      input {
        width: 30px;
        border-style: none;
        text-align: center;

        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }

      button {
        width: 36px;
        height: 36px;
        border-style: none;
      }
    }
  }
`;
