import { useSwitchContext } from "../../../Provider/SwitchForm/switchProvider";
import { useLoginForm } from "../../../hooks/form/login";

function LoginUser() {
  const { activeForm, setActiveForm } = useSwitchContext();
  const { email, setEmail, password, setPassword, handleLogin, errorLogin } =
    useLoginForm();
  return (
    <>
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
