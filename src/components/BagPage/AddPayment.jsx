import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { HeaderDataContext } from "../../App";
import api from "../../services/api";

export default function AddPayment(props) {
  const { showAddAddress } = props;

  const { setHeaderButton, setHeaderTitle } = useContext(HeaderDataContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setHeaderTitle("Add new card");
  }, []);

  const [formData, setFormData] = useState({
    type: "",
    holderName: "",
    number: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [showedMessage, setShowedMessage] = useState(false);

  function handleEvent(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }


  async function savePayment(event) {
    event.preventDefault();
    try {
      const promise = await api.createPayment(token, formData);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AddressContainer showAddAddress={showAddAddress}>
      <Message>{showedMessage && showedMessage}</Message>
      <form onSubmit={savePayment}>
        <FormContainer>
          <div>
            <label htmlFor="holderName">Holder name</label>
            <input
              name="holderName"
              type="text"
              value={formData.holderName}
              onChange={handleEvent}
              required
            />
          </div>
          <div>
            <label htmlFor="number">Credit card number</label>
            <input
              name="number"
              type="number"
              value={formData.number}
              onChange={handleEvent}
              required
            />
          </div>
          <div>
            <label htmlFor="expiryMonth">Expiry month</label>
            <input
              name="expiryMonth"
              type="number"
              value={formData.expiryMonth}
              onChange={handleEvent}
              maxLength={2}
              required
            />
          </div>
          <div>
            <label htmlFor="expiryYear">Expiry year</label>
            <input
              name="expiryYear"
              type="number"
              value={formData.expiryYear}
              onChange={handleEvent}
              maxLength={4}
              required
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <input
              name="cvv"
              type="number"
              value={formData.cvv}
              onChange={handleEvent}
              required
            />
          </div>
          <button type="submit">SAVE CREDIT CARD</button>
        </FormContainer>
      </form>
    </AddressContainer>
  );
}

const Message = styled.div`
  padding-bottom: 30px;
  width: 90vw;
  height: 20px;
  color: #f01f0e;
  text-align: center;
  font-family: Montserrat;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0em;
`;

const AddressContainer = styled.div`
  display: block;
  background-color: #f9f9f9;
  /* background-color: grey; */
  width: 100vw;
  height: 100vh;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  div {
    padding-top: 7px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #ffffff;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    width: 90vw;
    height: 60px;
    label {
      font-family: Montserrat;
      font-size: 13px;
      font-weight: 500;
      color: #9b9b9b;
      line-height: 11px;
      letter-spacing: 0em;
      text-align: left;
    }
    input {
      border: none;
      background-color: #ffffff;
      height: 100%;
      font-family: Montserrat;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;

      :focus {
        background-color: #ffffff;
        border: none;
        outline: none;
      }
    }
  }
  a {
    margin-top: 3px;
    display: block;
    text-align: center;
    width: 90vw;
    font-family: MontSerrat;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0em;
  }
  button {
    margin-top: 4px;
    color: #ffffff;
    background-color: #4d3837;
    border-radius: 24px;
    width: 90%;
    height: 48px;
    border: none;
    font-family: Montserrat;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;

    :hover {
      background-color: #392a29;
    }
  }
`;
