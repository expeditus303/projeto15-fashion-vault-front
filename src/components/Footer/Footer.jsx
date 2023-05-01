import { useState } from "react";
import styled from "styled-components";
import NavIcon from "./NavIcon";
import { useNavigate } from "react-router-dom";
import homeSelectedIcon from "../../assets/icons/home-icon/activatedicons.svg";
import homeOutLineIcon from "../../assets/icons/home-icon/inactiveicons.svg";
import heartSelectedIcon from "../../assets/icons/heart-icon/activatedicons.svg";
import heartOutLineIcon from "../../assets/icons/heart-icon/inactiveicons.svg";
import profileSelectedIcon from "../../assets/icons/profile-icon/activatedicons.svg";
import profileOutLineIcon from "../../assets/icons/profile-icon/inactiveicons.svg";
import shopSelectedIcon from "../../assets/icons/shop-icon/activatedicons.svg";
import shopOutLineIcon from "../../assets/icons/shop-icon/inactiveicons.svg";
import shoppingBagSelectedIcon from "../../assets/icons/shopping_bag-icon/activatedicons.svg";
import shoppingBagOutLineIcon from "../../assets/icons/shopping_bag-icon/inactiveicons.svg";

export default function Footer(props) {
  const { selecionado } = props;
  const icons = [
    {
      name: "Home",
      route: "/home",
      solid: homeSelectedIcon,
      outLine: homeOutLineIcon,
    },
    {
      name: "Shop",
      route: "/shop",
      solid: shopSelectedIcon,
      outLine: shopOutLineIcon,
    },
    {
      name: "Bag",
      route: "/bag",
      solid: shoppingBagSelectedIcon,
      outLine: shoppingBagOutLineIcon,
    },
    {
      name: "Favorites",
      route: "/favorites",
      solid: heartSelectedIcon,
      outLine: heartOutLineIcon,
    },
    {
      name: "Profile",
      route: "/profile",
      solid: profileSelectedIcon,
      outLine: profileOutLineIcon,
    },
  ];
  const navigate = useNavigate();

  function clickedIcon(name, route) {
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
