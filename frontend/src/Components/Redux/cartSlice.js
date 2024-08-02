import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false, // Add loading state
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setNotLoading: (state) => {
      state.loading = false;
    },
    showLoading: (state) => {
      state.loading = true;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.cartItems.push({ ...item, quantity: 1, totalPrice: item.price });
      }
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.totalPrice = existingItem.quantity * existingItem.price;
        } else {
          state.cartItems = state.cartItems.filter((cartItem) => cartItem._id !== item._id);
        }
      }
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, setNotLoading, showLoading } = cartSlice.actions;
export default cartSlice.reducer;
