import { createContext, useContext, useReducer, useEffect } from "react";
import cartReducer from "./storeReducer";
import inventoryReducer from "./inventoryReducer";
import { fetchData } from "../api/fetchData";

const CartContext = createContext();
const CartDispatchContext = createContext();
const InventoryContext = createContext();
const InventoryDispatchContext = createContext();

export function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });
  const [inventoryState, inventoryDispatch] = useReducer(inventoryReducer);

  useEffect(() => {
    const initializeInventory = async () => {
      try {
        const items = await fetchData();

        const inventoryArray = items.map((item) => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          price: item.price,
          available: item.available,
          options: item.options.map((variant) => ({
            color: variant.color,
            quantity: variant.quantity,
            originalQuantity: variant.quantity,
            power: variant.power,
            storage: variant.storage,
          })),
        }));

        inventoryDispatch({
          type: "SET_INVENTORY",
          payload: inventoryArray,
        });
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    initializeInventory();
  }, [inventoryDispatch]);

  return (
    <InventoryContext.Provider value={inventoryState}>
      <InventoryDispatchContext.Provider value={inventoryDispatch}>
        <CartContext.Provider value={cartState}>
          <CartDispatchContext.Provider value={cartDispatch}>
            {children}
          </CartDispatchContext.Provider>
        </CartContext.Provider>
      </InventoryDispatchContext.Provider>
    </InventoryContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
export function useCartDispatch() {
  return useContext(CartDispatchContext);
}
export function useInventoryContext() {
  return useContext(InventoryContext);
}
export function useInventoryDispatch() {
  return useContext(InventoryDispatchContext);
}
