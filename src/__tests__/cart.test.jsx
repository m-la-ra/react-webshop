import { renderHook, act } from "@testing-library/react";
import {
  CartProvider,
  useCartContext,
  useCartDispatch,
} from "../contexts/storeContext";

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe("CartContext", () => {
  it("should add items to the cart", () => {
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
          item: { id: 3, name: "Playstation 4", price: "5000" },
          variant: { color: "black" },
          quantity: 1,
        },
      });
    });

    act(() => {
      result.current.dispatch({
        type: "ADD_ITEM",
        payload: {
          item: { id: 4, name: "Nintendo switch", price: "4500" },
          variant: { color: "white" },
          quantity: 1,
        },
      });
    });

    expect(result.current.state.items).toHaveLength(2);
    expect(result.current.state.items[0]).toMatchObject({
      item: { id: 3, name: "Playstation 4", price: "5000" },
      variant: { color: "black" },
      quantity: 1,
    });
    expect(result.current.state.items[1]).toMatchObject({
      item: { id: 4, name: "Nintendo switch", price: "4500" },
      variant: { color: "white" },
      quantity: 1,
    });
  });
});
