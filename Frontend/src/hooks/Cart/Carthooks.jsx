import {
  clearCart,
  getCart,
  removeFromCart,
  addToCart,
} from "../../API/Cart/API";
import { useCartContext } from "../../Provider/CartProvider/cartProvider";

export function useCart() {
  const {
    cart,
    setCart,
    loadingCart,
    clearLoadingCart,
    setLoadingCart,
    setClearLoadingCart,
    clearLoadingItem,
    setClearLoadingItem
  } = useCartContext();

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

  const handleAddToCart = async (menuId) => {
    try {
      setLoadingCart(true);
      await addToCart(menuId, 1);
      const updatedCart = await getCart();
      setCart(updatedCart);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCart(false);
    }
  };

  const handleRemoveAll = async () => {
    try {
      setClearLoadingCart(true);
      await clearCart();
      const updated = await getCart();
      setCart(updated);
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    } finally {
      setClearLoadingCart(false);
    }
  };

  const clearHandleClick = () => {
    handleRemoveAll()
  }

  const handleRemoveItem = async (menuId) => {
    try {
      setClearLoadingItem(menuId)
      await removeFromCart(Number(menuId));
      const updated = await getCart();
      setCart(updated);
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    } finally {
      setClearLoadingItem(null)
    }
  };

  return {
    cart,
    setCart,
    loadingCart,
    setLoadingCart,
    handleAddToCart,
    handleRemoveAll,
    clearLoadingCart,
    setClearLoadingCart,
    clearLoadingItem,
    setClearLoadingItem,
    clearHandleClick,
    handleRemoveItem,
    total,
  };
}
