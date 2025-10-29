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
          itemKey: "5-red",
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
          itemKey: "1-white-6.5W",
          selectedOption: "6.5W",
          variant: { color: "white", power: "6.5W" },
          quantity: 2,
        },
      });
    });

    const addedItemKeyOne = result.current.state.items[0].itemKey;
    const addedItemKeyTwo = result.current.state.items[1].itemKey;

    act(() => {
      result.current.dispatch({
        type: "REMOVE_ITEM",
        payload: { itemKey: addedItemKeyTwo },
      });
    });

    expect(result.current.state.items[1].quantity).toBe(1);

    act(() => {
      result.current.dispatch({
        type: "REMOVE_ITEM",
        payload: { itemKey: addedItemKeyOne },
      });
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0]).toMatchObject({
      item: { id: 1, name: "Philips hue bulb", price: "500" },
      itemKey: "1-white-6.5W",
      selectedOption: "6.5W",
      variant: { color: "white", power: "6.5W" },
      quantity: 1,
    });

    act(() => {
      result.current.dispatch({
        type: "REMOVE_ITEM",
        payload: { itemKey: addedItemKeyTwo },
      });
    });
    expect(result.current.state.items).toHaveLength(0);
  });
});
