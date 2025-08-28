import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const p = action.payload;
      const found = state.items.find((i) => i.id === p.id);
      if (found) {
        found.qty += 1;
      } else {
        state.items.push({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          qty: 1,
        });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload.id ?? action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    increaseQty(state, action) {
      const id = action.payload.id ?? action.payload;
      const found = state.items.find((i) => i.id === id);
      if (found) found.qty += 1;
    },
    decreaseQty(state, action) {
      const id = action.payload.id ?? action.payload;
      const found = state.items.find((i) => i.id === id);
      if (!found) return;
      found.qty -= 1;
      if (found.qty <= 0) {
        state.items = state.items.filter((i) => i.id !== id);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = createSelector(
  selectCartItems,
  (items) => items.length
);

export const selectCartTotalQty = createSelector(selectCartItems, (items) =>
  items.reduce((sum, i) => sum + i.qty, 0)
);

export const selectCartTotalPrice = createSelector(selectCartItems, (items) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0)
);

export default cartSlice.reducer;
