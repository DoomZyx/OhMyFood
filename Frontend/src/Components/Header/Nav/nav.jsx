import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Store/User/authSlice";
import "./_nav.scss";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="layout-cart-user">
      <Link to="/">
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
  );
}

export default Nav;
