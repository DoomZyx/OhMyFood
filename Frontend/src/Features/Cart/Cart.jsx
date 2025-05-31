import { useCart } from "../../hooks/Cart/Carthooks";
import { getCart } from "../../API/Cart/API";
import { useEffect } from "react";
import ModalCart from "../../Components/Modal/Cart/modal-cart-model";
import "./_Cart.scss";
import { useSelector } from "../../../node_modules/react-redux/dist/react-redux";
import MiniLoader from "../../Components/Animations/Loader/MiniLoader/miniLoader";

export default function Cart({ isOpen, onClose }) {
  const {
    cart,
    setCart,
    loadingCart,
    clearLoadingCart,
    clearHandleClick,
    handleRemoveItem,
    clearLoadingItem,
    total,
  } = useCart();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      getCart().then(setCart).catch(console.error);
    }
  }, [isOpen, isAuthenticated]);

  function renderCartContent() {
    if (loadingCart || clearLoadingCart) {
      return <MiniLoader />;
    }

    if (!isAuthenticated) {
      return (
        <p className="empty-card">
          Veuillez vous connecter pour accéder à votre panier.
        </p>
      );
    }

    if (cart && cart.items.length > 0) {
      return (
        <>
          {cart.items.map(({ menu, quantity }, index) => (
            <ul key={`${menu._id}-${index}`}>
              <li className="cart-item">
                <button
                  className="delete-plate"
                  onClick={() => handleRemoveItem(menu._id)}
                  disabled={clearLoadingItem === menu._id}
                >
                  {clearLoadingItem === menu._id ? (
                    <MiniLoader className="mini-loader--small" />
                  ) : (
                    <i className="fa-solid fa-minus"></i>
                  )}
                </button>
                <div className="thirster">
                  {menu.name}
                  <br />
                </div>
                <div className="secondon">{menu.price} €</div>
              </li>
            </ul>
          ))}
          <div className="cart-total">
            <p>{total.toFixed(2)} €</p>
          </div>
          <div className="layout-button-cart">
            <button onClick={clearHandleClick}>
              <i className="fa-solid fa-trash"></i>
            </button>
            <button className="cart-button-validation">
              <i className="fa-solid fa-check"></i>
            </button>
          </div>
        </>
      );
    }

    return <p className="empty-card">Votre panier est vide</p>;
  }

  return (
    <ModalCart isOpen={isOpen} onClose={onClose}>
      <h2 className="cart-title"> MES COMMANDES </h2>
      <div className="cart-modal-overlay">
        <div className="layout-cart">{renderCartContent()}</div>
      </div>
    </ModalCart>
  );
}
