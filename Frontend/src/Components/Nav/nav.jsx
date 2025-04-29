import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Store/User/authSlice";
import Cart from "../../Features/Panier/Cart";
import "./_nav.scss";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isModalCart, setModalCart] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="layout-cart-user">
      <Link to="/">
        <i className="fa-solid fa-store"></i>
      </Link>
      <button className="cart-but" onClick={() => setModalCart(true)}>
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
      <Cart isOpen={isModalCart} onClose={() => setModalCart(false)} />
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
