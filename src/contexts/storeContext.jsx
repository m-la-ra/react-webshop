import { createContext, useContext } from "react";

const CartStateContext = createContext();
const state = "items";
export function CartProvider({ children }) {
  return (
    <CartStateContext.Provider value={state}>
      {children}
    </CartStateContext.Provider>
  );
}

export function useCart() {
return useContext(CartStateContext);
}
