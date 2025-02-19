import logo from "../../../assets/logo/ohmyfood.png";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/User/authSlice";
import Modal from "../Modal/menu_modal";

function Header() {
  const location = useLocation();
  const hideArrowOnpaths = ["/"];
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  console.log(user)

  return (
    <>
      <header>
        {!hideArrowOnpaths.includes(location.pathname) ? (
          <Link to="/">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        ) : (
          <>
            <button onClick={toggleSidebar} className="Sidebar">
              <i className="fa-solid fa-bars"></i>
            </button>
            <Modal isOpen={isSidebarOpen} onClose={toggleSidebar}>
            <div className="sidebar-layout">
              <Link to="#">
                <i className="fa-solid fa-user"></i>
                {isAuthenticated && <p className="user-firstName">{user.firstName}</p>}
              </Link>
              <Link to="#">
              <i className="fa-solid fa-basket-shopping"></i> 
              </Link>
            </div>
            </Modal>
          </>
        )}
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="layout-cart-user">
          <Link to="#">
            <i className="fa-solid fa-store"></i>
          </Link>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="logout-but">
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          ) : (
            <Link to="/login">
              <i className="fa-solid fa-user"></i>
            </Link>
          )}
        </div>
        <div className="location-search">
          <div className="location-icon"></div>
          <form>
            <label htmlFor="city" className="icon-label">
              <i className="fa-solid fa-location-dot"></i>
            </label>
            <input
              type="search"
              id="city"
              name="city"
              placeholder="Paris, Belleville"
            />
          </form>
        </div>
      </header>
    </>
  );
}

export default Header;
