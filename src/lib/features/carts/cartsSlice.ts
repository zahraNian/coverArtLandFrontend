import { compareArrays } from "@/lib/utils";
import { Discount } from "@/types/product.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const calcAdjustedTotalPrice = (
  totalPrice: number,
  data: CartItem,
  quantity?: number
): number => {
  // data.price is already the discounted price (currentPrice)
  const q = quantity ? quantity : data.quantity;
  return data.price * q;
};

export type RemoveCartItem = {
  id: string | number;
  attributes: string[];
};

export type CartItem = {
  id: string | number;
  name: string;
  srcUrl: string;
  price: number;
  attributes: string[];
  discount: Discount;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalQuantities: number;
};

// Define a type for the slice state
interface CartsState {
  cart: Cart | null;
  totalPrice: number;
  adjustedTotalPrice: number;
  action: "update" | "add" | "delete" | null;
}

// Define the initial state using that type
const initialState: CartsState = {
  cart: null,
  totalPrice: 0,
  adjustedTotalPrice: 0,
  action: null,
};

export const cartsSlice = createSlice({
  name: "carts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // if cart is empty then add
      if (state.cart === null) {
        const quantityToAdd = 1;
        const itemToAdd = { ...action.payload, quantity: quantityToAdd };
        state.cart = {
          items: [itemToAdd],
          totalQuantities: quantityToAdd,
        };
        state.totalPrice = state.totalPrice + itemToAdd.price * quantityToAdd;
        state.adjustedTotalPrice =
          state.adjustedTotalPrice +
          calcAdjustedTotalPrice(state.totalPrice, itemToAdd);
        return;
      }

      // check product already in cart (by product id)
      const existingById = state.cart.items.find(
        (item) => action.payload.id === item.id
      );

      // If already exists, do not add again (enforce max 1 per product)
      if (existingById) return;

      const quantityToAdd = 1;
      const itemToAdd = { ...action.payload, quantity: quantityToAdd };
      state.cart = {
        ...state.cart,
        items: [...state.cart.items, itemToAdd],
        totalQuantities: state.cart.totalQuantities + quantityToAdd,
      };
      state.totalPrice = state.totalPrice + itemToAdd.price * quantityToAdd;
      state.adjustedTotalPrice =
        state.adjustedTotalPrice +
        calcAdjustedTotalPrice(state.totalPrice, itemToAdd);
    },
    removeCartItem: (state, action: PayloadAction<RemoveCartItem>) => {
      if (state.cart === null) return;

      // check item in cart
      const isItemInCart = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      if (isItemInCart) {
        state.cart = {
          ...state.cart,
          items: state.cart.items
            .map((eachCartItem) => {
              if (
                eachCartItem.id === action.payload.id
                  ? !compareArrays(
                      eachCartItem.attributes,
                      isItemInCart.attributes
                    )
                  : eachCartItem.id !== action.payload.id
              )
                return eachCartItem;

              return {
                ...isItemInCart,
                quantity: eachCartItem.quantity - 1,
              };
            })
            .filter((item) => item.quantity > 0),
          totalQuantities: state.cart.totalQuantities - 1,
        };

        state.totalPrice = state.totalPrice - isItemInCart.price * 1;
        state.adjustedTotalPrice =
          state.adjustedTotalPrice -
          calcAdjustedTotalPrice(isItemInCart.price, isItemInCart, 1);
      }
    },
    remove: (
      state,
      action: PayloadAction<RemoveCartItem & { quantity: number }>
    ) => {
      if (!state.cart) return;

      // check item in cart
      const isItemInCart = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      if (!isItemInCart) return;

      state.cart = {
        ...state.cart,
        items: state.cart.items.filter((pItem) => {
          return pItem.id === action.payload.id
            ? !compareArrays(pItem.attributes, isItemInCart.attributes)
            : pItem.id !== action.payload.id;
        }),
        totalQuantities: state.cart.totalQuantities - isItemInCart.quantity,
      };
      state.totalPrice =
        state.totalPrice - isItemInCart.price * isItemInCart.quantity;
      state.adjustedTotalPrice =
        state.adjustedTotalPrice -
        calcAdjustedTotalPrice(
          isItemInCart.price,
          isItemInCart,
          isItemInCart.quantity
        );
    },
  },
});

export const { addToCart, removeCartItem, remove } = cartsSlice.actions;

export default cartsSlice.reducer;
