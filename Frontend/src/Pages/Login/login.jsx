import "./_login.scss";
import Loader from "../../Components/Animations/Loader/loader";
import Header from "../../Components/Header/header";
import { SwitchProvider } from "../../Provider/SwitchForm/switchProvider";
import RegisterForms from "../../Features/Form/AuthForm/subscription";
import LoginUser from "../../Features/Form/AuthForm/login";
import Footer from "../../Components/Footer/footer";

import food1 from "../../../assets/images/food1.webp";

function Login() {
  return (
    <>
      <Loader />
      <Header />
      <main>
        <div className="image-form">
          <img src={food1} alt="" />
          <SwitchProvider>
            <div className="form-container">
              <RegisterForms />
              <LoginUser />
            </div>
          </SwitchProvider>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;
