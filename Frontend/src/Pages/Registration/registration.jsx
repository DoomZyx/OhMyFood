import { useState } from "react";
import "./_registration.scss";
import Header from "../../Components/Header/header";
import foodplate2 from "/public/images/foodplate2.webp";
import Footer from "../../Components/Footer/footer";
import DelivererRegistration from "../../Features/Form/RegistrationForm/delivererRegistration";
import OwnerRegistration from "../../Features/Form/RegistrationForm/ownerRegistration";

function Registration() {
  const [switchUpForm, setSwitchUpForm] = useState("owner");
  return (
    <>
      <Header />
      <div className="background-owner-register">
        <img className="background-register" src={foodplate2} alt="" />
        <div className="form-container-add">
          <div
            className={`Form owner-register-container ${
              switchUpForm === "owner" ? "true" : "false"
            }`}
          >
            <button
              className="switch-btn deliverer"
              onClick={() => setSwitchUpForm("deliver")}
            >
              Livreur
            </button>
            <OwnerRegistration />
          </div>
          <div
            className={`Form deliverer-register-container ${
              switchUpForm === "deliver" ? "true" : "falsy"
            }`}
          >
            <button
              className="switch-btn"
              onClick={() => setSwitchUpForm("owner")}
            >
              Restaurateur
            </button>
            <DelivererRegistration />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Registration;
