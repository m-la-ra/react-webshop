function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item, variant, quantity } = action.payload;
      const itemKey = `${item.id}-${JSON.stringify(variant)}`;
      const itemExists = state.items.find(
        (cartItem) => cartItem.itemKey === itemKey
      );

      if (!item || !item.id) return state;

      if (itemExists) {
        return {
          ...state,
          items: state.items.map((cartItem) =>
            cartItem.itemKey === itemKey
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { itemKey, item, variant, quantity }],
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
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export default cartReducer;
