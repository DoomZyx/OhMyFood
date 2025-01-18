import logo from "../../../assets/logo/ohmyfood.png";

function Header() {
  return (
    <>
      <header>
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
