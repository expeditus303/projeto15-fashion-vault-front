import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { HeaderDataContext } from "../../App";
import { useNavigate } from "react-router-dom";
import returnButtonImg from "../../assets/Navigation-Bar/iconbackIcon.svg"

export default function Header(props) {
  const { headerTitle, headerButton } = props;
  const navigate = useNavigate();

  function clickButton() {
    navigate(-1);
  }

  return (
    <HeaderContainer>
      <img
        onClick={headerButton ? clickButton : null}
        src={returnButtonImg}
        alt=""
      />
      <p>{headerTitle}</p>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  z-index: 1;
  background-color: white;
  width: 100%;
  height: 45px;
  position: fixed;
  padding-left: 10px;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  box-shadow: 0px 4px 12px 0px #0000001F;
  img {
    width: 24px;
  }
  p {
    width: 70%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Montserrat;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0px;
    text-align: center;
  }
`;
