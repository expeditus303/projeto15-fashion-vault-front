import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BagPage from "./pages/BagPage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import React, { createContext, useEffect, useState } from "react";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";
export const HeaderDataContext = createContext();

export default function App() {
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerButton, setHeaderButton] = useState(true);
  const [selecionado, setSelecionado] = useState();
  const [showFooter, setShowFooter] = useState(true)

  return (
    <PagesContainer>
      <HeaderDataContext.Provider
        value={{ setHeaderButton, setHeaderTitle, setSelecionado, setShowFooter }}
      >
        <BrowserRouter>
          <Header headerButton={headerButton} headerTitle={headerTitle} />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/auth/sign-up" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/shop/*" element={<ShopPage />} />
            <Route path="/bag" element={<BagPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProfilePage />}></Route>
          </Routes>
          <Footer selecionado={selecionado} showFooter={showFooter}/>
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
