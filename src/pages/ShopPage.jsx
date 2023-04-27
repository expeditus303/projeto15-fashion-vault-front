import ShopContent from "../components/ShopPage/ShopContent";
import { useContext, useEffect } from "react";
import { HeaderDataContext } from "../App";

export default function ShopPage() {
  const { setHeaderData } = useContext(HeaderDataContext);

  useEffect(() => {
    setHeaderData({
      returnButton: true,
      headerTitle: "Categories",
    });
  }, []);

  return <ShopContent />;
}
