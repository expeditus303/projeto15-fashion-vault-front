import { useState } from "react";
import styled from "styled-components";
import NavIcon from "./NavIcon";

export default function Footer() {
  const [selecionado, setSelecionado] = useState("Home");
  const icons = [
    {
      name: "Home",
      solid: "assets/icons/home-icon/activatedicons.svg",
      outLine: "assets/icons/home-icon/inactiveicons.svg",
    },
    {
      name: "Shop",
      solid: "assets/icons/shop-icon/activatedicons.svg",
      outLine: "assets/icons/shop-icon/inactiveicons.svg",
    },
    {
      name: "Bag",
      solid: "assets/icons/shopping_bag-icon/activatedicons.svg",
      outLine: "assets/icons/shopping_bag-icon/inactiveicons.svg",
    },
    {
      name: "Favorites",
      solid: "assets/icons/heart-icon/activatedicons.svg",
      outLine: "assets/icons/heart-icon/inactiveicons.svg",
    },
    {
      name: "Profile",
      solid: "assets/icons/profile-icon/activatedicons.svg",
      outLine: "assets/icons/profile-icon/inactiveicons.svg",
    },
  ];

  function clickedIcon(name) {
    setSelecionado(name);
  }

  return (
    <FooterContainer>
      {icons.map((iconData) => {
        return <NavIcon selecionado={selecionado} clickedIcon={clickedIcon} iconData={iconData} />;
      })}
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0px -4px 20px 0px #0000000f;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  width: 100%;
  height: 12vh;
  position: fixed;
  bottom: 0;
  left: 0;
`;
