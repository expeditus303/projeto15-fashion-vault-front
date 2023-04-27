import { useState } from "react";
import styled from "styled-components";
import NavIcon from "./NavIcon";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [selecionado, setSelecionado] = useState("Home");
  const icons = [
    {
      name: "Home",
      route: "/home",
      solid: "assets/icons/home-icon/activatedicons.svg",
      outLine: "assets/icons/home-icon/inactiveicons.svg",
    },
    {
      name: "Shop",
      route: "/shop",
      solid: "assets/icons/shop-icon/activatedicons.svg",
      outLine: "assets/icons/shop-icon/inactiveicons.svg",
    },
    {
      name: "Bag",
      route: "/bag",
      solid: "assets/icons/shopping_bag-icon/activatedicons.svg",
      outLine: "assets/icons/shopping_bag-icon/inactiveicons.svg",
    },
    {
      name: "Favorites",
      route: "/favorites",
      solid: "assets/icons/heart-icon/activatedicons.svg",
      outLine: "assets/icons/heart-icon/inactiveicons.svg",
    },
    {
      name: "Profile",
      route: "/profile",
      solid: "assets/icons/profile-icon/activatedicons.svg",
      outLine: "assets/icons/profile-icon/inactiveicons.svg",
    },
  ];
  const navigate = useNavigate();

  function clickedIcon(name, route) {
    setSelecionado(name);
    navigate(route);
  }

  return (
    <FooterContainer>
      {icons.map((iconData) => {
        return (
          <NavIcon
            key={iconData.name}
            selecionado={selecionado}
            clickedIcon={clickedIcon}
            iconData={iconData}
          />
        );
      })}
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  z-index: 1;
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
