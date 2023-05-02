import { useContext, useEffect, useState } from "react";
import { HeaderDataContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import ProductsList from "./ProductsList";
import { MagnifyingGlass } from "react-loader-spinner";

export default function CatalogContent(params) {
  const { gender, category } = useParams();
  const { setHeaderTitle, setHeaderButton } = useContext(HeaderDataContext);
  const [productsList, setProductsList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const genderName = gender[0].toUpperCase() + gender.slice(1);
    const categoryName = category.toLowerCase();
    setHeaderTitle(`${genderName}'s ${categoryName}`);
    setHeaderButton(true);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(
        `${process.env.REACT_APP_LINK_API}/product/catalog/${gender}/${category}`,
        config
      )
      .then((res) => {
        setProductsList(res.data);
      })
      .catch((err) => {
        navigate(-1);
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
