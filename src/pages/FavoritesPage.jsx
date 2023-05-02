import styled from "styled-components";
import { Watch } from "react-loader-spinner";
import { useContext, useEffect } from "react";
import { HeaderDataContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const { setSelecionado, setHeaderTitle } = useContext(HeaderDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSelecionado("Favorites");
    setHeaderTitle("Favorites")
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <FavoritesContainer>
      <Watch width={90} height={90} color="#4d3837" />
      <h1>EM BREVE...</h1>
    </FavoritesContainer>
  );
}

const FavoritesContainer = styled.div`
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  h1 {
    color: #222222;
    font-family: Montserrat;
    font-weight: 700;
    font-size: 18px;
  }
`;
