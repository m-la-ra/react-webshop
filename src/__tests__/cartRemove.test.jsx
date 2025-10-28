import { renderHook, act } from "@testing-library/react";
import {
  CartProvider,
  useCartContext,
  useCartDispatch,
} from "../contexts/storeContext";

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe("CartContext", () => {
  it("should remove items from the cart", () => {
    const { result } = renderHook(
      () => {
        const state = useCartContext();
        const dispatch = useCartDispatch();
        return { state, dispatch };
      },
      { wrapper }
    );

    act(() => {
      result.current.dispatch({
        type: "ADD_ITEM",
        payload: {
          item: { id: 5, name: "Bluetooth speaker", price: "800" },
          variant: { color: "red" },
          quantity: 1,
        },
      });
    });

    act(() => {
      result.current.dispatch({
        type: "ADD_ITEM",
        payload: {
          item: { id: 1, name: "Philips hue bulb", price: "500" },
          variant: { color: "white", power: 6.5 },
          quantity: 3,
        },
      });
    });

    let addedItemKey = result.current.state.items[1].itemKey;

    act(() => {
      result.current.dispatch({
        type: "REMOVE_ITEM",
        payload: { itemKey: addedItemKey, quantity: 1 },
      });
    });

    expect(result.current.state.items[1].quantity).toBe(2);

    addedItemKey = result.current.state.items[0].itemKey;

    act(() => {
      result.current.dispatch({
        type: "REMOVE_ITEM",
        payload: { itemKey: addedItemKey, quantity: 1 },
      });
    });

    expect(result.current.state.items).toHaveLength(1);
  });
});
