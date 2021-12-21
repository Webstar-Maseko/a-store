import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCategories =  createAsyncThunk("category/get", async() => {

})

export const CategorySlicer = createSlice({
    name: 'category',
    initialState: []
, reducers:{

}})