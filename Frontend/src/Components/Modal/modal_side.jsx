import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ModalSide from "./Model/modal.-side-model";
import logo from "../../../assets/logo/ohmyfood.png";
import { useDispatch } from "../../../node_modules/react-redux/dist/react-redux";
import { fetchUserProfile } from "../../Store/FetchDataAPI/GetDataUser/ThunkAPI";
import "./_modal_side.scss"

function SideModal() {
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && (!user || user.id === "")) {
      dispatch(fetchUserProfile(sessionStorage.getItem("token")));
    }
  }, [dispatch, isAuthenticated, user?.id]);
  

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleSidebar} className="Sidebar">
        <i className="fa-solid fa-bars"></i>
      </button>
      <ModalSide isOpen={isSidebarOpen} onClose={toggleSidebar}>
        <div className="sidebar-layout">
          <div className="profile-link">
            <div className="user-circle">
              <i className="fa-solid fa-user"></i>
            </div>
            {isAuthenticated && user && (
              <>
                <div className="info-user">
                  <p className="user-firstName">{user.firstName}</p>
                  <p className="user-email">{user.email}</p>
                </div>{" "}
              </>
            )}
          </div>
          <Link className="my-profile" to="/profile">
            <i className="fa-regular fa-address-card"></i>
            <p className="profile">Mon profil</p>
          </Link>
          <Link className="my-purchases" to="#">
            <i className="fa-solid fa-basket-shopping"></i>
            <p className="commands">Mes commandes</p>
          </Link>
          <Link className="my-favorites">
            <i className="fa-solid fa-heart"></i>
            <p className="favorite">Mes favoris</p>
          </Link>
          <Link className="our-restaurants" to="/">
            <i className="fa-solid fa-utensils"></i>
            <p className="restaurants">Les restaurants</p>
          </Link>
          <Link className="prenium-case">
            <i className="fa-solid fa-bookmark"></i>
            <p className="premium">Premium</p>
          </Link>
          <Link className="contact-us">
            <i className="fa-solid fa-phone"></i>
            <p className="contact">Nous contacter</p>
          </Link>
        </div>
        <div className="second-layout-side">
          <Link>
            <p className="become-owner">Ajouter votre restaurant</p>
          </Link>
          <Link>
            <p className="professional-account">
              Créer votre compte professionnel
            </p>
          </Link>
          <Link>
            <p className="delivery-person">Être livreur</p>
          </Link>
          <Link to="">
            <p className="mention-legale">Mention légales</p>
          </Link>
          <Link to="">
            <p className="confident">Politique de confidentialiés</p>
          </Link>
        </div>
        <div className="side-logo">
          <img src={logo} alt="logo" />
        </div>
      </ModalSide>
    </>
  );
}

export default SideModal;
