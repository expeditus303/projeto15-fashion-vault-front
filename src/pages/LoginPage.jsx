import { useEffect } from "react";
import LoginContent from "../components/LoginPage/LoginContent";
import { useNavigate, useParams } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  return <LoginContent />;
}
