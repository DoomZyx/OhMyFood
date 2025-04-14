import "./_login.scss";
import AuthForms from "../../Components/AuthForm/auth";
import Loader from "../../Components/Animations/Loader/loader";
import Header from "../../Components/Header/header";
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
          <AuthForms />
      </div>
        </main>
      <Footer />
    </>
  );
}

export default Login;
