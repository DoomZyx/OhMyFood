import "./_authForm.scss";
import { Link } from "react-router-dom";
import { useSubscription } from "../../../hooks/form/subscription";
import { useSwitchContext } from "../../../Provider/SwitchForm/switchProvider";

function RegisterForms() {
  const { activeForm, setActiveForm } = useSwitchContext();
  const {
    emailRegister,
    setEmailRegister,
    passwordRegister,
    setPasswordRegister,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    number,
    setNumber,
    address,
    setAddress,
    town,
    setTown,
    postalCode,
    setPostalCode,
    errorRegister,
    handleRegister,
  } = useSubscription();

  return (
    <>
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
        <div className="form-sub-wrapper">
          <h2 className="register-title">Inscription</h2>
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
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Votre adresse"
            ></input>
            <input
              type="text"
              value={town}
              onChange={(e) => setTown(e.target.value)}
              placeholder="Votre ville"
            />
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Votre code postal"
            />
            <Link to="/">
              <p className="rest-sub-link">
                Vous êtes restaurateur ? Cliquez ici
              </p>
            </Link>
            <button type="submit" className="register-button">
              S'inscrire
            </button>
          </form>
          {errorRegister && <p style={{ color: "red" }}>{errorRegister}</p>}
        </div>
      </div>
    </>
  );
}

export default RegisterForms;
