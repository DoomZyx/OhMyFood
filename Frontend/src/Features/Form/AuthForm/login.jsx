import { useSwitchContext } from "../../../Provider/SwitchForm/switchProvider";
import { useLoginForm } from "../../../hooks/form/login";
import NotificationModal from "../../../Components/Modal/Notification/notification-modal-base";
import "../../../Components/Notification/_notification.scss";

import { useEffect, useState } from "react";

function LoginUser() {
  const { activeForm, setActiveForm } = useSwitchContext();
  const { email, setEmail, password, setPassword, handleLogin, errorLogin } =
    useLoginForm();
  const { isRegistered, setIsRegistered } = useSwitchContext();

  const [showRegisteredModal, setShowRegisteredModal] = useState(false);

  // Ce useEffect s'exécute :
  // Au montage du composant (si isRegistered === true)
  // À chaque fois que isRegistered change
  // Si isRegistered est à true et que la modale n'est pas encore affichée,
  // on l'affiche, puis on la referme au bout de 4 secondes.
  // Ensuite, on remet isRegistered à false pour réinitialiser l'état.

  useEffect(() => {
    // Exécute seulement si isRegistered est true et que la modale n'est pas déjà visible
    if (!isRegistered || showRegisteredModal) return;

    setShowRegisteredModal(true);

    const timer = setTimeout(() => {
      setShowRegisteredModal(false);
      setIsRegistered(false); // Réinitialise après affichage
    }, 4000);

    return () => clearTimeout(timer); // Nettoie le timer si le composant se démonte trop vite
  }, [isRegistered, showRegisteredModal, setIsRegistered]);

  return (
    <>
      {showRegisteredModal && (
        <NotificationModal
          isOpen={showRegisteredModal}
          onClose={() => setShowRegisteredModal(false)}
        >
          <div className="registered-successful-layout">
            <p>Inscription réussi !</p>
            <i className="fa-solid fa-check"></i>
          </div>
        </NotificationModal>
      )}
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
        <div className="form-login-wrapper">
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
    </>
  );
}

export default LoginUser;
