import { useEffect, useState } from "react";
import { clearCart, getCart, removeFromCart } from "../../API/Cart/API";
import Modal from "../../Components/Modal/Model/modal";
import "./_Cart.scss";

export default function Cart({ isOpen, onClose }) {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    if (isOpen) {
      getCart().then(setCart).catch(console.error);
    }
  }, [isOpen]);

  // Calcul du total du panier à partir des items
  const total = cart.items?.reduce((acc, item) => {
    // Récupère le prix du menu (0 si non défini, par sécurité)
    const price = item.menu?.price || 0;

    // Récupère la quantité (par défaut 1 si absente)
    const quantity = item.quantity || 1;

    // Ajoute au total (prix * quantité)
    return acc + price * quantity;
  }, 0) || 0; // acc = accumulateur, initialisé à 0

  const handleRemoveAll = async () => {
    try {
      await clearCart();
      const updated = await getCart();
      setCart(updated);
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    }
  };

  const handleRemoveItem = async (menuId) => {
    try {
      await removeFromCart(Number(menuId));
      const updated = await getCart();
      setCart(updated);
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
    </Modal>
  );
}
