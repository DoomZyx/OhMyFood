import Loader from "../../Components/Animations/Loader/loader";
import Header from "../../Components/Header/header";
import Presentation from "./H-Components/Presentation/presentation";
import Functionning from "./H-Components/Functionning/functionning";
import Restaurants from "./H-Components/HomepageRestaurants/restaurantsH";
import Footer from "../../Components/Footer/footer";

import { useAuth } from "../../Provider/Auth/authProvider";
import Modal from "../../Components/Modal/Notification/notification-modal-base";

function Homepage() {
  const { showModal, hideModal } = useAuth();
  return (
    <>
      <Loader />
      <Header />
      <div className="homepage">
        <main>
          {showModal && (
            <Modal isOpen={true} onClose={hideModal}>
              <p>Vous devez être connecté pour accéder à cette page.</p>
            </Modal>
          )}
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
