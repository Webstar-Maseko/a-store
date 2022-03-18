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
    const categories = await axios

      .post("/api/category/deleteCategory", id )
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

const buildCategory = (parentId,categories, category) =>{
  let newCategories = [];

  for(let cat of categories){
    if(cat._id === parentId){
      newCategories.push({
        ...cat, children: cat.children && cat.children.length > 0 ? buildCategory(parentId,[cat.children,{
          _id: category._id,
          parentId:category.parentId,
          name: category.name,
          image: category.image,
          children: category.children
        }], category) : []
      })
    }else{
      newCategories.push({
        ...cat, children: cat.children && cat.children.length > 0 ? buildCategory(parentId,cat.children, category) : []
      })
    }
    
  }

  return newCategories;
}

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
      return action.payload.categories;

    },
  },
});

export default CategorySlicer.reducer;
