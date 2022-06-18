import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearMessage, setMessage } from "./MessageSlicer";

//Initialize the client field with what is currently set on localStorage
const client = JSON.parse(localStorage.getItem("client"));

//Login and set the client field to the logged in client
export const Login = createAsyncThunk(
  "client/login",
  async (data, thunkAPI) => {
    const client = await axios
      .post("/api/user/login", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) =>{
        thunkAPI.dispatch(setMessage("Incorrect password or username"));
        return null;

      } );

      client &&localStorage.setItem("client", JSON.stringify(client));
    return client;
  }
);

//Destroy the client object on both the localStorage and backend session
export const Logout = createAsyncThunk("client/logout", async () => {
  const client = await axios
    .post("/api/user/logout")
    .then(() => null)
    .catch((err) => alert(err));
  localStorage.removeItem("client");
  return client;
});

//Register the client and set the client field to the new registered client
export const RegisterClient = createAsyncThunk(
  "client/Register",
  async (data, thunkAPI) => {
    const client = await axios
      .post("/api/user/register", data)
      .then((res) => {
        if (res.status !== 200) {
          thunkAPI.dispatch(setMessage(res.data));
        } else {
          return res.data;
        }
      })
      .catch((err) => {
        thunkAPI.dispatch(setMessage(err.response.data.message));
      });

      client &&localStorage.setItem("client", JSON.stringify(client));
    return client;
  }
);

const initialState = client
  ? { isLoggedIn: true, client }
  : { isLoggedIn: false, client: null };

export const clientSlicer = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: {
    [Login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.client = action.payload.client;
    },
    [Logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.client = null;
    },
    [RegisterClient.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoggedIn = true;
      state.client = action.payload.client;
    },
  },
});

export default clientSlicer.reducer;
