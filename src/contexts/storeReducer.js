function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item, itemKey, variant, quantity, selectedOption } =
        action.payload;

      const itemExists = state.items.find(
        (cartItem) => cartItem.itemKey === itemKey
      );

      if (!item || !item.id) return state;

      if (itemExists) {
        return {
          ...state,
          items: state.items.map((cartItem) =>
            cartItem.itemKey === itemKey
              ? { ...cartItem, quantity: cartItem.quantity + 1, selectedOption }
              : cartItem
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { itemKey, item, variant, quantity, selectedOption },
        ],
      };
    }

    case "REMOVE_ITEM": {
      const { itemKey } = action.payload;

      return {
        ...state,
        items: state.items
          .map((cartItem) =>
            cartItem.itemKey === itemKey
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
          .filter((cartItem) => cartItem.quantity > 0),
      };
    }

    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (cartItem) => cartItem.itemKey !== action.payload.itemKey
        ),
      };

    case "SET_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.itemKey === action.payload.itemKey
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export default cartReducer;
