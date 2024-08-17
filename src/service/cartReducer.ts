import { Product } from "./catalogAPI";
import { createSlice } from '@reduxjs/toolkit'


type CartItem = {
  id: number;
  product: Product;
  quantity: number;
  created_at: string;
  updated_at: string;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    removeFromCart(state, action) {
      return state.filter(item => item.id !== action.payload.id);
    },
    updateCartItem(state, action) {
      const { id, quantity } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    }
  }
})

export const { addToCart, removeFromCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
