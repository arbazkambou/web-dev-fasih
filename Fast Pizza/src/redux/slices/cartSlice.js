import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  initialState,
  name: 'cart',

  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    incQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    decQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;

        if (item.quantity <= 0) {
          cartSlice.caseReducers.deleteItem(state, action);
        }
      }
    },
  },
});

export const { addItem, deleteItem, incQuantity, decQuantity } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const getCartState = (state) => state.cart.cart;

export const getQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce(
    (totalPrice, pizza) => totalPrice + pizza.totalPrice,
    0
  );

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((quantity, pizza) => quantity + pizza.quantity, 0);
