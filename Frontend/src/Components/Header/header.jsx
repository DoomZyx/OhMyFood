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
        <img src={logo} alt="logo" />
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
