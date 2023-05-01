import { useContext, useEffect, useState } from "react";
import { HeaderDataContext } from "../../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import ProductsList from "./ProductsList";
import { MagnifyingGlass } from "react-loader-spinner";

export default function CatalogContent(params) {
  const { gender, category } = useParams();
  const { setHeaderTitle, setHeaderButton } = useContext(HeaderDataContext);
  const [productsList, setProductsList] = useState();

  useEffect(() => {
    const genderName = gender[0].toUpperCase() + gender.slice(1);
    const categoryName = category.toLowerCase();
    setHeaderTitle(`${genderName}'s ${categoryName}`);
    setHeaderButton(true);

    const body = {
      gender: gender,
      category: category,
    };

    axios.get(`http://localhost:5000/product/catalog/${gender}/${category}`).then((res) => {
      setProductsList(res.data);
    });
  }, []);

  if (!productsList) {
    return (
      <Loading>
        <MagnifyingGlass width={110} height={110} color="#4d3837" />
      </Loading>
    );
  }

  return (
    <CatalogContainer>
      <ProductsList productsList={productsList}></ProductsList>
    </CatalogContainer>
  );
}

const Loading = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35vh;
`;

const CatalogContainer = styled.div`
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
`;
