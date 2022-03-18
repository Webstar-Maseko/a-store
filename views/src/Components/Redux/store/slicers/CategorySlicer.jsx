import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk("category/get", async () => {
  const categories = await axios
    .get("/api/category/index")
    .then((res) => res.data)
    .catch((error) => alert(error));

  return { categories };
});

export const CategorySlicer = createSlice({
  name: "category",
  initialState: [],
  reducers: {},
  extraReducers:{
      [getCategories.fulfilled] :(state,action) =>{
          return action.payload.categories;
      }
  }
});


export default CategorySlicer.reducer;