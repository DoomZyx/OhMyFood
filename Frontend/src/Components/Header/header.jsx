import logo from "../../../assets/logo/ohmyfood.png";
import Nav from "../Nav/nav";
import NavMenu from "../NavMenu/navMenu";
import LocationSearch from "./locationSearch/location-search";

function Header() {
  return (
    <>
      <header>
        <>
          <NavMenu />
        </>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <Nav />
        <LocationSearch />
      </header>
    </>
  );
}

export default Header;
