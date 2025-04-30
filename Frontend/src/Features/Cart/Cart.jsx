import { useCart } from "../../hooks/Cart/Carthooks";
import { getCart } from "../../API/Cart/API";
import { useEffect } from "react";
import ModalCart from "../../Components/Modal/Cart/modal-cart-model";
import "./_Cart.scss";

export default function Cart({ isOpen, onClose }) {
  const { cart, setCart, handleRemoveAll, handleRemoveItem, total } = useCart();

  useEffect(() => {
    if (isOpen) {
      getCart().then(setCart).catch(console.error);
    }
  }, [isOpen]);

  return (
    <ModalCart isOpen={isOpen} onClose={onClose}>
      <h2 className="cart-title"> MES COMMANDES </h2>
      <div className="cart-modal-overlay">
        <div className="layout-cart">
          {cart && cart.items.length > 0 ? (
            <>
              {cart.items.map(({ menu, quantity }, index) => (
                <ul key={`${menu._id}-${index}`}>
                  <li className="cart-item">
                    <button
                      className="delete-plate"
                      onClick={() => handleRemoveItem(menu._id)}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <div className="thirster">
                      {menu.name} <br />
                    </div>
                    <div className="secondon">{menu.price} €</div>
                  </li>
                </ul>
              ))}
            </>
          ) : (
            <p className="empty-card"> Votre panier est vide </p>
          )}
          <div className="cart-total">
            <p>{total.toFixed(2)} €</p>
          </div>
          <div className="layout-button-cart">
            <button onClick={handleRemoveAll}>
              <i className="fa-solid fa-trash"></i>
            </button>
            <button className="cart-button-validation">
              <i className="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    </ModalCart>
  );
}
