import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer/Footer";
import ShopPage from "./pages/ShopPage";
import React, { createContext, useState } from "react";

export default function App() {
  const [headerData, setHeaderData] = useState();

  const HeaderData = React.createContext();

  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  width: 100%;
  height: 100%;
`;
