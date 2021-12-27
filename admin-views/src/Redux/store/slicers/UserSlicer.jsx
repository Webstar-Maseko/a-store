import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearMessage, setMessage } from "./MessageSlicer";

const user = JSON.parse(localStorage.getItem("user"));

export const Logout = createAsyncThunk("AdminUser/logout", async () => {
  const user = await axios
    .post("api/admin/logout")
    .then(() => null)
    .catch((err) => alert(err.message));
    localStorage.removeItem("user");
  return user;
});

export const Login = createAsyncThunk(
  "AdminUser/login",
  async (data, thunkAPI) => {
    const user = await axios
      .post("/api/admin/login", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        thunkAPI.dispatch(setMessage("username or password is not recognized"));
      });
      localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
);

export const Register = createAsyncThunk("AdminUser/register", async(data, thunkAPI) =>{
  const user = await axios
      .post("/api/admin/register", data)
      .then((res) => {
        if (res.data.name === "UserExistsError") {
          thunkAPI.dispatch(setMessage(res.data.message));
        } else {
          thunkAPI.dispatch(clearMessage())
         return res.data;
        }
      })
      .catch((err) => alert(err));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
})

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const AdminUserSlicer = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: {
    [Login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [Logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [Register.fulfilled] : (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    }
  },
});

export default AdminUserSlicer.reducer;