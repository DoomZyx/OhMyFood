import { useEffect, useState } from "react";
import { clearCart, getCart, removeFromCart } from "../../API/API";
import Modal from "./modal";

export default function Cart({ isOpen, onClose }) {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (isOpen) {
      getCart().then(setCart).catch(console.error);
    }
  }, [isOpen]);

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
      <div className="cart-modal-overlay">
        <h2> Mon panier </h2>
        <div className="layout-cart">
          {cart && cart.items.length > 0 ? (
            <>
              <p>
                <strong>{cart.restaurant.name}</strong>
              </p>
              {cart.items.map(({ menu, quantity }, index) => (
                <ul key={`${menu._id}-${index}`}>
                  <li>
                    {menu.name} <br />
                    Quantité : {quantity} <br />
                    {menu.price} €
                  </li>
                  <button onClick={() => handleRemoveItem(menu._id)}>-</button>
                </ul>
              ))}
            </>
          ) : (
            <p> Votre panier est vide </p>
          )}
          <button onClick={handleRemoveAll}>
            <p> Vider le panier </p>
          </button>
        </div>
      </div>
    </Modal>
  );
}