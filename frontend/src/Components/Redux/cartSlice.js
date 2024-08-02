import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setLoading } = cartSlice.actions;
export default cartSlice.reducer;
