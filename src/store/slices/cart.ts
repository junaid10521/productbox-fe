import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, IProduct } from "@types";
import { calculateTotalAmount } from "@utils";

const initialState: ICart = {
  totalAmount: 0,
  items: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<IProduct>) => {
      state.items.push({
        ...action.payload,
        quantity: 1,
        totalPrice: action.payload.price,
      });
      state.totalAmount = calculateTotalAmount(state.items);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
        state.totalAmount = calculateTotalAmount(state.items);
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
        state.totalAmount = calculateTotalAmount(state.items);
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        state.totalAmount = calculateTotalAmount(state.items);
      }
    },
  },
});

export const {
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
