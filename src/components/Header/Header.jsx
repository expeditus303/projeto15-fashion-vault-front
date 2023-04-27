import { useContext } from "react";
import styled from "styled-components";
import { HeaderDataContext } from "../../App";

export default function Header() {
  const { headerData } = useContext(HeaderDataContext);

  return (
    <HeaderContainer>
      {headerData.returnButton && (
        <img src="assets/icons/Navigation-Bar/iconbackIcon.svg" alt="" />
      )}
      <p>{headerData.headerTitle}</p>
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
  img {
    width: 24px;
  }
  p {
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
