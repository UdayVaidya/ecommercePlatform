// In src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart(state, action) {
      return action.payload;
    },
    addToCart(state, action) {
      state.push(action.payload);
    },
    removeFromCart(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
    updateCart(state, action) {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
