import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";

export default function LoginContent() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [showedMessage, setShowedMessage] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    if (e.target.name === "email") {
      setInputData((inputData) => {
        return { ...inputData, email: e.target.value };
      });
    }
    if (e.target.name === "password") {
      setInputData((inputData) => {
        return { ...inputData, password: e.target.value };
      });
    }
  }

  function signIn(e) {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = inputData;
    const body = {
      email,
      password,
    };
    axios
      .post(`${process.env.REACT_APP_LINK_API}/auth/sign-in`, body)
      .then((res) => {
        setShowedMessage(false);
        setIsLoading(false);
        const { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/home");
      })
      .catch((err) => {
        setIsLoading(false);
        setShowedMessage(err.response.data);
      });
  }

  return (
    <LoginContainer>
      <Title>Sign in</Title>
      <Message>{showedMessage && showedMessage}</Message>
      <form onSubmit={signIn}>
        <FormContainer>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              onChange={handleChange}
              name="email"
              id="email"
              type="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              name="password"
              id="password"
              type="password"
              required
            />
          </div>
          <Link to="/auth/sign-up">
            doesn't have an account? click here to register
          </Link>
          <button type="submit">
            {isLoading ? <ProgressBar borderColor="#ffffff" /> : "LOGIN"}
          </button>
        </FormContainer>
      </form>
    </LoginContainer>
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
    display: flex;
    align-items: center;
    justify-content: center;
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

const Title = styled.div`
  margin-bottom: 5vh;
  color: #222222;
  font-family: Montserrat;
  font-size: 34px;
  font-weight: 800;
  line-height: 34px;
  letter-spacing: 0em;
  text-align: left;
`;

const LoginContainer = styled.div`
  padding-top: 15vh;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #f9f9f9;
  /* background-color: grey; */
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 5;
  top: 0;
  left: 0;
`;
