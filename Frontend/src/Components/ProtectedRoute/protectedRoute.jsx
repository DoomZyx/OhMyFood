import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/Auth/authProvider";

const ProtectedRoute = ({ children }) => {
  const { requireAuth, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!requireAuth()) {
      navigate("/"); // redirige vers accueil
    }
  }, [token]);

  return token ? children : null;
};

export default ProtectedRoute;
