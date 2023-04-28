import styled from "styled-components";
import CategoriesContent from "./CategoriesContent";
import { Route, Routes } from "react-router-dom";
import CatalogContent from "./CatalogContent";

export default function ShopContent() {
  return (
    <Routes>
      <Route path="/" element={<CategoriesContent />} />
      <Route path="/:gender/:category" element={<CatalogContent />} />
    </Routes>
  );
}
