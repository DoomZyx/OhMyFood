import logo from "../../../assets/logo/ohmyfood.png";
import Nav from "../Nav/nav";
import SideModal from "../Modal/modal_side";
import LocationSearch from "./locationSearch/location-search";

function Header() {
  return (
    <>
      <header>
        <>
          <SideModal />
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
