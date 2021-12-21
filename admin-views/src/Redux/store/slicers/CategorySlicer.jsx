import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk("category/get", async () => {
 const categories = await axios
    .get("/api/category/index")
    .then((res) => res.data)
    .catch((error) => alert(error));

   return {categories }
});

export const deleteCategories = createAsyncThunk("category/delete", async(id) =>{
    console.log(id);
    const categories = await axios

        .post("/api/category/deleteCategory", {id})
                .then((res) => res.data)
                .catch((err) => alert(err));
        return {categories}
});

export const createCategory = createAsyncThunk("catefory/add", async(data) => {
    const categories = axios
      .post("/api/category/create", data)
      .then((res) => {alert("Successfully saved")})
      .catch((error) => alert(error));
    return {categories}
});

export const CategorySlicer = createSlice({
  name: "category",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      return action.payload.categories;
    },
  },
  [deleteCategories.fulfilled] : (state, action) =>{
      state =  getCategories();
  },

  [createCategory.fulfilled] : (state, action) =>{
      state = getCategories();
  }
});

export default CategorySlicer.reducer;
