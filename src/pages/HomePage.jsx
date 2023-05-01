import styled from "styled-components";
import HomeContent from "../components/HomePage/HomeContent";
import { useContext, useEffect } from "react";
import { HeaderDataContext } from "../App";

export default function HomePage() {
  const { setSelecionado } = useContext(HeaderDataContext);
  useEffect(() => {
    setSelecionado("Home");
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
