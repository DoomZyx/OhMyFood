import Loader from "../../Components/Animations/Loader/loader";
import Header from "../../Components/Header/header";
import Presentation from "./H-Components/Presentation/presentation";
import Functionning from "./H-Components/Functionning/functionning";
import Restaurants from "./H-Components/HomepageRestaurants/restaurantsH";
import Footer from "../../Components/Footer/footer";

function Homepage() {
  return (
    <>
      <Loader />
      <Header />
      <div className="homepage">
        <main>
          <Presentation />
          <Functionning />
          <Restaurants />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default Homepage;
