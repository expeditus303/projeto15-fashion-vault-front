import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BagPage from "./pages/BagPage";
import ShopPage from "./pages/ShopPage";
import React, { createContext, useEffect, useState } from "react";
export const HeaderDataContext = createContext();

export default function App() {
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerButton, setHeaderButton] = useState(false);

  return (
    <PagesContainer>
      <HeaderDataContext.Provider value={{ setHeaderButton ,headerButton ,headerTitle, setHeaderTitle }}>
        <BrowserRouter>
          <Header headerButtonButton={headerButton} headerTitle={headerTitle} />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/shop/*" element={<ShopPage />} />
            <Route path="/bag" element={<BagPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </HeaderDataContext.Provider>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  width: 100%;
  height: 100%;
  background-color: black;
`;
