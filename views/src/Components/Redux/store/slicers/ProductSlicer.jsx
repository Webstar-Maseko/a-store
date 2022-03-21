import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("products/get", async (data) => {
  const { root, sub, category } = data;
  const products = await axios
    .get(`/api/product/${root}/${sub}/${category}`)
    .then((res) => res.data)
    .catch((error) => alert(error));

  return { products };
});

//get a single product with axios call
export const getProduct = createAsyncThunk("product/get", async (product) => {
  const productDetails = await axios
    .get(`/api/product/${product}`)
    .then((res) => res.data)
    .catch((err) => alert(err));

  return { productDetails };
});

export const ProductSlicer = createSlice({
  name: "products",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      console.log(action.payload.products);
      return action.payload.products;
    },
    [getProduct.fulfilled]: (state, action) => {
      return action.payload.productDetails;
    },
  },
});

export default ProductSlicer.reducer;
