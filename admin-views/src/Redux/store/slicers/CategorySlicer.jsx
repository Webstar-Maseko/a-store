import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk("category/get", async () => {
  const categories = await axios
    .get("/api/category/index")
    .then((res) => res.data)
    .catch((error) => alert(error));

  return { categories };
});

export const deleteCategories = createAsyncThunk(
  "category/delete",
  async (id) => {
    console.log(id);
    const categories = await axios

      .post("/api/category/deleteCategory", { id })
      .then((res) => res.data)
      .catch((err) => alert(err));
    return { categories };
  }
);

export const createCategory = createAsyncThunk("category/add", async (data) => {
  const categories = await axios
    .post("/api/category/create", data)
    .then((res) => {
      alert("Successfully saved");
      return res.data;
    })
    .catch((error) => alert(error));
  return { categories };
});

export const CategorySlicer = createSlice({
  name: "category",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      return action.payload.categories;
    },
    [deleteCategories.fulfilled]: (state, action) => {
      return action.payload.categories;
    },

    [createCategory.fulfilled]: (state, action) => {
      console.log("the payload: " + action.payload.categories);

      let index = state.findIndex(({_id}) => _id === action.payload.categories.parentId);

      console.log(index);
      //state[index].children.push(action.payload.categories);

      //state.push(action.payload.categories);
      getCategories()
    },
  },
});

export default CategorySlicer.reducer;
