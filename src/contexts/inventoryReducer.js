function inventoryReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_INVENTORY":
      return { ...state, ...payload };

    default:
      return state;
  }
}

export default inventoryReducer;
