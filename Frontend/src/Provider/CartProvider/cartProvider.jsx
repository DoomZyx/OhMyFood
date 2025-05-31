import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loadingCart, setLoadingCart] = useState(false);
  const [clearLoadingCart, setClearLoadingCart] = useState(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loadingCart,
        setLoadingCart,
        clearLoadingCart,
        setClearLoadingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
