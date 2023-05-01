import { useContext, useEffect } from "react";
import ShopContent from "../components/ShopPage/ShopContent";
import { HeaderDataContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function ShopPage() {
  const { setSelecionado } = useContext(HeaderDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSelecionado("Shop");
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  return <ShopContent />;
}
