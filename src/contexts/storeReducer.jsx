function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item, variant, quantity } = action.payload;
      const itemKey = `${item.id}-${JSON.stringify(variant)}`;
      const itemExists = state.items.find((item) => item.itemKey === itemKey);

      if (itemExists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.itemKey === itemKey
              ? { ...item, quantity: item.quantity + quantity }
              : item
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
          .map((item) =>
            item.itemKey === itemKey
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.itemKey !== action.payload.itemKey
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export default cartReducer;
