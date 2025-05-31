import Header from "../../Components/Header/header";
import Presentation from "./H-Components/Presentation/presentation";
import Functionning from "./H-Components/Functionning/functionning";
import Restaurants from "./H-Components/HomepageRestaurants/restaurantsH";
import Footer from "../../Components/Footer/footer";


import { useAuth } from "../../Provider/Auth/authProvider";
import { useAuthOwner } from "../../Provider/Auth/authOwnerProvider";
import Modal from "../../Components/Modal/Notification/notification-modal-base";

function Homepage() {
  const { showModal, hideModal } = useAuth();
  const { showOwnerModal, hideOwnerModal } = useAuthOwner();

  return (
    <>
      <Header />
      <div className="homepage">
        <main>
          {showOwnerModal && (
            <Modal isOpen={true} onClose={hideOwnerModal}>
              <p className="notif-content">
                Vous devez être propriétaire d'un restaurant pour pouvoir y
                accéder
              </p>
            </Modal>
          )}
          {showModal && (
            <Modal isOpen={true} onClose={hideModal}>
              <p className="notif-content">Vous devez être connecté pour accéder à cette page.</p>
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
