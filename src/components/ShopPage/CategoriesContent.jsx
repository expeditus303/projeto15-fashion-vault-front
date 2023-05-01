import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Categories from "./CategoriesList";
import { HeaderDataContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function CategoriesContent() {
  const [selected, setSelected] = useState("women");
  const { setHeaderTitle, setHeaderButton } = useContext(HeaderDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderTitle("Categories");
    setHeaderButton(false);
  }, []);

  function clickGender(gender) {
    setSelected(gender);
  }

  const menCategories = [
    {
      gender: "men",
      category: "Clothes",
      thumb:
        "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      gender: "men",
      category: "Accessories",
      thumb:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      gender: "men",
      category: "Underwear",
      thumb:
        "https://images.unsplash.com/photo-1601393710008-984348f7447b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=367&q=80",
    },
  ];
  const womenCategories = [
    {
      gender: "women",
      category: "Clothes",
      thumb:
        "https://images.unsplash.com/photo-1520024146169-3240400354ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=326&q=80",
    },
    {
      gender: "women",
      category: "Accessories",
      thumb:
        "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      gender: "women",
      category: "Intimates",
      thumb:
        "https://images.unsplash.com/photo-1582366457363-930f4436009a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=469&q=80",
    },
  ];

  function viewAllClick() {
    navigate(`/shop/${selected}/all`);
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
        <button onClick={viewAllClick}>VIEW ALL ITEMS</button>
      </AllItemsButton>
      <Categories
        list={selected === "women" ? womenCategories : menCategories}
      />
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
  z-index: 2;
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
