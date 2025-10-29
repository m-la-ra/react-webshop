import { renderHook, act } from "@testing-library/react";
import {
  CartProvider,
  useCartContext,
  useCartDispatch,
} from "../contexts/storeContext";

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe("CartContext", () => {
  it("should clear all items from the cart", () => {
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
          quantity: 2,
        },
      });
    });

    act(() => {
      result.current.dispatch({
        type: "CLEAR",
      });
    });

    expect(result.current.state.items).toHaveLength(0);
  });
});
