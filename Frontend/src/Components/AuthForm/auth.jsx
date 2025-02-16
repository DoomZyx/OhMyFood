import { useState } from "react";
import "../AuthForm/_authForm.scss";

function AuthForms() {
  const [activeForm, setActiveForm] = useState("inscription");

  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [firstName, setFirstName] = useState("");
  const [name, setName ] = useState("");
  const [number, setNumber] = useState("");
  const [errorRegister, setErrorRegister] = useState("");

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="form-container">
      <div
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
        <form className="registerForm" onSubmit="">
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
          ></input>
          <input type="text"
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
        <form className="loginForm" onSubmit="">
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
          <p className="passwordForgotten">Mot de passe oublié</p>
        </form>
      </div>
    </div>
  );
}

export default AuthForms;
