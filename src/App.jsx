import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  width: 100%;
  height: 100%;
`;
