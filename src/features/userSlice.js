import { createSlice } from "@reduxjs/toolkit";
import { addToCart, addUser, clearAll, clearCart, getCart, getUser } from "./localStorage";




const initialState = {
  user: getUser(),
  carts: getCart()
};


export const userSlice = createSlice({
  initialState,
  name: 'userInfo',
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      addUser(state.user);
    },
    setCart: (state, action) => {
      const existItem = state.carts.find((a) => a.product === action.payload.product);
      if (!existItem) {
        state.carts.push(action.payload);
        addToCart(state.carts);
      }

    },
    updateCart: (state, action) => {
      state.carts = state.carts.map((cart) => {
        return cart.product === action.payload.product ? action.payload : cart;
      });
      addToCart(state.carts);
    },
    removeFromCart: (state, action) => {
      state.carts.splice(action.payload, 1);
      addToCart(state.carts);
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      addUser(state.user);
    },
    clearCarts: (state, action) => {
      clearCart();
      state.carts = [];

    },
    clearData: (state, action) => {
      state.user = null;
      state.carts = [];
      clearAll();
    },

  }
});
export const { clearData, setUser, updateCart, clearCarts, updateUser, setCart, removeFromCart } = userSlice.actions;

export default userSlice.reducer;