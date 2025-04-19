import { useState } from "react";
import "../AuthForm/_authForm.scss";

import { useDispatch } from "react-redux";
import { login } from "../../Store/User/authSlice";
import { useNavigate } from "react-router-dom";

import { signupUser } from "../../API/API";
import { loginUser } from "../../API/API";

function AuthForms() {
  const [activeForm, setActiveForm] = useState("inscription");
  const navigate = useNavigate();

  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [errorRegister, setErrorRegister] = useState("");

  const dispatch = useDispatch()

  // Fonction appelée lors de la soumission du formulaire d'inscription
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await signupUser({
        email: emailRegister,
        password: passwordRegister,
        firstName,
        lastName: lastName,
        phoneNumber: number,
      });

      console.log("Inscription réussie :", data);
      setActiveForm("connexion")
    } catch (error) {
      if (error.response) {
        setErrorRegister(error.message || "Impossible de contacter le serveur");
      }
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const data = await loginUser({ email, password });
      sessionStorage.getItem("token", data.token);
      console.log("Connexion réussie :", data);
      
      // Dispatch l'action login avec le token et les données utilisateur
      dispatch(login({ token: data.token, ...data.user }));
      
      navigate("/");
    } catch (error) {
      if (error.response) {
        setErrorLogin(error.message || "Erreur lors de la connexion");
      }
    }
  };

  return (
    <div className="form-container">        <div
          className={`form inscriptionForm ${
            activeForm === "inscription" ? "active" : "inactive"
          }`}
        >
          <button
            className="register-switch"
            onClick={() => setActiveForm("connexion")}
          >
            Connexion
          </button>
          <h2 className="register-title">S'inscrire</h2>
          <form className="registerForm" onSubmit={handleRegister}>
            <label htmlFor="email"></label>
            <input
              type="email"
              value={emailRegister}
              onChange={(e) => setEmailRegister(e.target.value)}
              placeholder="Votre email"
            ></input>
            <input
              type="password"
              value={passwordRegister}
              onChange={(e) => setPasswordRegister(e.target.value)}
              placeholder="Mot de passe"
            ></input>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Votre prénom"
            ></input>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Votre nom"
            ></input>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Votre numéro de téléphone"
            ></input>
            <button type="submit" className="register-button">
              S'inscrire
            </button>
          </form>
          {errorRegister && <p style={{ color: "red" }}>{errorRegister}</p>}
        </div>

        <div
          className={`form connexionForm ${
            activeForm === "connexion" ? "active" : "right"
          }`}
        >
          <button
            className="connection-switch"
            onClick={() => setActiveForm("inscription")}
          >
            S'inscrire
          </button>
          <h2 className="login-title">Connexion</h2>
          <form className="loginForm" onSubmit={handleLogin}>
            <label htmlFor="email"></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
            ></input>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
            ></input>
            <button type="submit" className="register-button">
              Se connecter
            </button>
            {errorLogin && <p style={{ color: "red" }}>{errorLogin}</p>}
            <p className="passwordForgotten">Mot de passe oublié</p>
          </form>
        </div>
      </div>
  );
}

export default AuthForms;
