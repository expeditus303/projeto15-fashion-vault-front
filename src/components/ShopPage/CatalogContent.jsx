import { useContext, useEffect } from "react";
import { HeaderDataContext } from "../../App";
import { useParams } from "react-router-dom";

export default function CatalogContent(params) {
  const { gender, category } = useParams();
  const { setHeaderTitle, setHeaderButton } = useContext(HeaderDataContext);

  useEffect(() => {
    const genderName = gender[0].toUpperCase() + gender.slice(1);
    const categoryName = category.toLowerCase();
    setHeaderTitle(`${genderName}'s ${categoryName}`);
    setHeaderButton(true);
  }, []);

  return <div></div>;
}
