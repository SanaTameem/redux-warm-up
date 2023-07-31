import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
  // return fetch(url)
  // .then(resp=>resp.json())
  // .catch(err=>console.log(err));
  try {
    const resp = await axios(url);
    // console.log(resp);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Something went wrong');
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      // const itemId = action.payload;
      const cartItems = state.cartItems.find((item) => item.id === payload.id);
      cartItems.amount += 1;
    },
    decrease: (state, { payload }) => {
      // const itemId = action.payload;
      const cartItems = state.cartItems.find((item) => item.id === payload.id);
      cartItems.amount -= 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },

  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
    },
  },
});

// console.log(cartSlice.actions);
export const {
  clearCart, removeItem, increase, decrease, calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
