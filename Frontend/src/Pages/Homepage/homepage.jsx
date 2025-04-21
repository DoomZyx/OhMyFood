import Loader from "../../Components/Animations/Loader/loader";
import Header from "../../Components/Header/header";
import Presentation from "../../Components/Homepage/Presentation/presentation";
import Functionning from "../../Components/Homepage/Functionning/functionning";
import Restaurants from "../../Components/Homepage/HomepageRestaurants/restaurantsH";
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
