import logo from "../../../assets/logo/ohmyfood.png";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const hideArrowOnpaths = ["/"];


  return (
    <>
      <header>
        {!hideArrowOnpaths.includes(location.pathname) && (
          <Link to="/">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        )}
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="layout-cart-user">
          <Link to="">
          <i className="fa-solid fa-store"></i>
          </Link>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <Link to="/login">
            <i className="fa-solid fa-user"></i>
          </Link>
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
