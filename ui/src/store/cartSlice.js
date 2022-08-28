import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    cartIsVisible: false,
  },
  reducers: {
    showCart(state) {
      state.cartIsVisible = true;
    },

    hideCart(state) {
      state.cartIsVisible = false;
    },

    addToCart(state, action) {
      const newItem = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      const existingItem = state.items[existingItemIndex];

      const itemQty = parseInt(newItem.quantity);

      state.totalQuantity = state.totalQuantity + itemQty;
      state.totalAmount = state.totalAmount + newItem.price * itemQty;
      console.log(state.totalQuantity);

      if (existingItem) {
        existingItem.quantity = +existingItem.quantity + itemQty;
        existingItem.amount = existingItem.amount + newItem.price * itemQty;
      } else {
        state.items.push({
          name: newItem.name,
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          amount: newItem.price * itemQty,
        });
      }
    },

    increaseItem(state, action) {
      const item = action.payload;
      const itemIndex = state.items.findIndex((x) => x.id === item.id);
      const updatedItem = state.items[itemIndex];
      updatedItem.quantity = parseInt(updatedItem.quantity) + 1;
      updatedItem.amount = parseInt(updatedItem.quantity) * item.price;
      state.totalAmount = state.totalAmount + item.price;
      state.totalQuantity++;
    },

    decreaseItem(state, action) {
      const item = action.payload;
      const itemIndex = state.items.findIndex((x) => x.id === item.id);
      const updatedItem = state.items[itemIndex];
      const itemQty = parseInt(updatedItem.quantity);
      if (itemQty === 1) {
        state.items = state.items.filter((x) => x.id !== item.id);
        state.totalAmount = state.totalAmount - item.price;
        state.totalQuantity = state.totalQuantity - 1;
      } else {
        updatedItem.quantity = itemQty - 1;
        updatedItem.amount = updatedItem.amount - updatedItem.price;
        state.totalAmount = state.totalAmount - updatedItem.price;
        state.totalQuantity = state.totalQuantity - 1;
      }
    },

    removeFromCart(state, action) {
      const item = action.payload;
      state.items = state.items.filter((x) => x.id !== item.id);
      state.totalAmount = state.totalAmount - item.amount;
      state.totalQuantity = state.totalQuantity - +item.quantity;
    },
  },
});

export const {
  addToCart,
  increaseItem,
  decreaseItem,
  removeFromCart,
  showCart,
  hideCart,
} = cartSlice.actions;

export default cartSlice.reducer;
