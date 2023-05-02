import styled from "styled-components";
import HomeContent from "../components/HomePage/HomeContent";
import { useContext, useEffect } from "react";
import { HeaderDataContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { setSelecionado } = useContext(HeaderDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSelecionado("Home");
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, []);

  return (
    <HomeContainer>
      <HomeContent></HomeContent>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  height: 100%;
  width: 100vw;
  line-height: 0;
`;
