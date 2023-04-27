import { useState } from "react";
import styled from "styled-components";

export default function CategoriesContent() {
  const [selected, setSelected] = useState("women");

  function clickGender(gender) {
    setSelected(gender);
  }

  return (
    <CategoriesContainer>
      <NavBarCategories>
        <WomenButton onClick={() => clickGender("women")} selected={selected}>
          <h2>Women</h2>
        </WomenButton>
        <MenButton onClick={() => clickGender("men")} selected={selected}>
          <h2>Men</h2>
        </MenButton>
      </NavBarCategories>
      <AllItemsButton>
        <button>VIEW ALL ITEMS</button>
      </AllItemsButton>
    </CategoriesContainer>
  );
}

const AllItemsButton = styled.div`
  padding-top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    color: #ffffff;
    background-color: #4d3837;
    border-radius: 24px;
    width: 90%;
    height: 48px;
    border: none;
    :hover {
      background-color: #392a29;
    }
  }
`;

const WomenButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  font-weight: ${(props) => props.selected === "women" && "500"};
  border-bottom: ${(props) =>
    props.selected === "women" && "2px solid #4d3837"};
`;

const MenButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  font-weight: ${(props) => props.selected === "men" && "500"};
  border-bottom: ${(props) => props.selected === "men" && "2px solid #4d3837"};
`;

const NavBarCategories = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 42px;
  position: fixed;
  top: 45px;
  display: flex;
  h2 {
    font-family: Montserrat;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
  }
`;

const CategoriesContainer = styled.div`
  background-color: #f9f9f9;
  width: 100vw;
  height: 100vh;
`;
