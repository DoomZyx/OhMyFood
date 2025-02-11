import Loader from "../../Components/Animations/Loader/loader";
import Header from "../../Components/Header/header";
import Presentation from "../../Components/HomepageComponents/Presentation/presentation";
import Functionning from "../../Components/HomepageComponents/Functionning/functionning";
import Restaurants from "../../Components/HomepageComponents/HomepageRestaurants/restaurantsH";
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
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Homepage;
