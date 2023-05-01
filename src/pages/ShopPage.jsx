import { useContext, useEffect } from "react";
import ShopContent from "../components/ShopPage/ShopContent";
import { HeaderDataContext } from "../App";

export default function ShopPage() {
  const { setSelecionado } = useContext(HeaderDataContext);
  useEffect(() => {
    setSelecionado("Shop");
  }, []);
  return <ShopContent />;
}
