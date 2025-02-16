import AuthForms from "../../Components/AuthForm/auth";
import Loader from "../../Components/Animations/Loader/loader";
import Header from "../../Components/Header/header";
import Footer from "../../Components/Footer/footer";

function Login() {
  return (
    <>
      <Loader />
      <Header />
      <main>
      <AuthForms />
      <Footer />
      </main>
    </>
  );
}

export default Login;
