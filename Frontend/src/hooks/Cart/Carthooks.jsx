import {  useState } from "react";
import { clearCart,getCart, removeFromCart } from "../../API/Cart/API";

export function useCart() {
  const [cart, setCart] = useState({ items: [] });

  // Calcul du total du panier à partir des items
  const total =
    cart.items?.reduce((acc, item) => {
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

  return {
    cart,
    setCart,
    handleRemoveAll,
    handleRemoveItem,
    total
  };
}
