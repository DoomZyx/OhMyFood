import AuthenticatedModal from "../../../../Components/Modal/Notification/notification-modal-base";
import "../../../../Components/Notification/_notification.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Presentation() {
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRegisteredModal, setShowRegisteredModal] = useState(false);

  // Vérifie si l'état est vrai ou faux
  useEffect(() => {
    if (location.state?.isLoggedIn) {
      setShowAuthModal(true);
      // Timer pour faire disparaitre la modale
      const timer = setTimeout(() => {
        setShowAuthModal(false);
      }, 4000);

      // Nettoyage du state de l'URL + du timer
      window.history.replaceState({}, document.title);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.isRegistered) {
      setShowRegisteredModal(true);
    }
  }, [location.state]);

  return (
    <>
      {showAuthModal && (
        <AuthenticatedModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        >
          <div className="connection-successful-layout">
            <p>Connexion réussi !</p>
            <i className="fa-solid fa-check"></i>
          </div>
        </AuthenticatedModal>
      )}
      {showRegisteredModal && (
        <AuthenticatedModal
          isOpen={showRegisteredModal}
          onClose={() => setShowRegisteredModal(false)}
        >
          <div className="registered-successful-layout">
            <p>Votre inscription est validée</p>
            <i className="fa-solid fa-check"></i>
          </div>
        </AuthenticatedModal>
      )}
      <section className="und_header">
        <h2>Réservez le menu qui vous convient</h2>
        <h3>
          Découvrez des restaurants d'exception, sélectionnés par nos soins
        </h3>
        <div className="btn-place">
          <button className="explore-btn">Explorer nos restaurants</button>
        </div>
      </section>
    </>
  );
}
export default Presentation;
