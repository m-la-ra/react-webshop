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
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export default cartReducer;
