import { useContext, useEffect } from "react";
import ProfileContent from "../components/ProfilePage/ProfileContent";
import { HeaderDataContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { setSelecionado, setHeaderTitle } = useContext(HeaderDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSelecionado("Profile");
    setHeaderTitle("Profile");
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return <ProfileContent></ProfileContent>;
}
