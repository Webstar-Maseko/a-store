import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const GetProduct = createAsyncThunk("product/getProduct", async() =>{
   const products = await axios
      .get("api/product/getProduct")
      .then((res) => res.data)
      .catch((err) => alert(err));

      return {products}
})

export const CreateProduct = createAsyncThunk("product/addProduct", async(formData) =>{
    const product  = await axios
    .post("api/product/create", formData)
    .then((res) => res.data)
    .catch((err) => alert(err));
    return {product}
})

export const DeleteProduct = createAsyncThunk("product/deleteProduct", async(id) =>{
   const products = await axios
    .post("/api/product/delete", { id })
    .then((res) =>  res.data)
    .catch((err) => alert(err));

    return {products};
})


export const ProductSlicer = createSlice({
    name: "product",
    initialState: [],
    reducers :{},
    extraReducers:{
        [GetProduct.fulfilled] : (state, action) =>{
            return action.payload.products;
        },
        [CreateProduct.fulfilled] : (state, action) =>{
            state.push(action.payload.product);
        },
        [DeleteProduct.fulfilled] : (state, action) =>{
            return action.payload.products;
        }
    }
})

export default ProductSlicer.reducer;