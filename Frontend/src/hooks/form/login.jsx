import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../Store/User/authSlice";
import { loginUser } from "../../API/Account/API";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      console.log(data);
      sessionStorage.setItem("token", data.token);

      dispatch(login({ token: data.token, ...data.user }));

      navigate("/");
    } catch (error) {
      if (error.response) {
        setErrorLogin(error.message || "Erreur lors de la connexion");
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    errorLogin,
  };
}
