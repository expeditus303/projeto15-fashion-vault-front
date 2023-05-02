import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { HeaderDataContext } from "../../App";
import api from "../../services/api";

export default function AddAddress(props) {
  const { showAddAddress } = props;

  const { setHeaderButton, setHeaderTitle } = useContext(HeaderDataContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setHeaderTitle("Adding Shipping Address");
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  console.log(formData);
  const [showedMessage, setShowedMessage] = useState(false);

  function handleEvent(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "value" ? Number(value) : value,
    });
  }

  async function saveAddress(event) {
    event.preventDefault();
    try {
      const promise = await api.createAddress(token, formData);
    } catch (err) {
      console.log(err);
    }
  }

  const MOCK = {
    name: "Ricardo",
    street: "Rua Joaquim",
    number: "301",
    neighborhood: "Centro",
    city: "Drivenópolis",
    state: "RJ",
    country: "Brazil",
    postalCode: "84564-781",
  };

  return (
    <AddressContainer showAddAddress={showAddAddress}>
      <Message>{showedMessage && showedMessage}</Message>
      <form onSubmit={saveAddress}>
        <FormContainer>
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleEvent}
              required
            />
          </div>
          <div>
            <label htmlFor="street">Street</label>
            <input
              name="street"
              type="text"
              value={formData.street}
              onChange={handleEvent}
              required
            />
          </div>
          <div>
            <label htmlFor="number">Number</label>
            <input
              name="number"
              type="text"
              value={formData.number}
              onChange={handleEvent}
              required
            />
          </div>
          <div>
            <label htmlFor="neighborhood">Neighborhood</label>
            <input
              name="neighborhood"
              type="text"
              value={formData.neighborhood}
              onChange={handleEvent}
              required
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              name="city"
              type="text"
              value={formData.city}
              onChange={handleEvent}
              required
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              name="state"
              type="text"
              value={formData.state}
              onChange={handleEvent}
              required
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              name="country"
              type="text"
              value={formData.country}
              onChange={handleEvent}
              required
            />
          </div>
          <div>
            <label htmlFor="postalCode">Zip Code</label>
            <input
              name="postalCode"
              type="text"
              value={formData.zipCode}
              onChange={handleEvent}
              required
            />
          </div>
          <button type="submit">SAVE ADDRESS</button>
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
