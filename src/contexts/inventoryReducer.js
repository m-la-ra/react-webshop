function inventoryReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_INVENTORY":
      return { ...state, ...payload };

    case "INCREASE_QUANTITY": {
      const { variantKey, amount = 1 } = payload;
      const currentQuantity = state[variantKey] ?? 0;
      return {
        ...state,
        [variantKey]: currentQuantity + amount,
      };
    }

    case "DECREASE_QUANTITY": {
      const { variantKey, amount = 1 } = payload;
      const currentQuantity = state[variantKey] ?? 0;
      const newQuantity =
        currentQuantity > 1 ? currentQuantity - amount : currentQuantity;
      return {
        ...state,
        [variantKey]: newQuantity,
      };
    }

    default:
      return state;
  }
}

export default inventoryReducer;
