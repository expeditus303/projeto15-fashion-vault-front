import styled from "styled-components";
import HomeContent from "../components/HomePage/HomeContent";

export default function HomePage() {
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
