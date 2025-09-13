import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


// Define a type for the slice state
interface ProductsState {
  sizeSelection: string;
}

// Define the initial state using that type
const initialState: ProductsState = {
  sizeSelection: "Large",
};

export const productsSlice = createSlice({
  name: "products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
  },
});

export default productsSlice.reducer;
