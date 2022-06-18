import { createSlice } from "@reduxjs/toolkit";


export const MessageSlicer = createSlice({
    name: "message",
    initialState: {},
    reducers:{
        setMessage:(state, action) => {
            return {message: action.payload}
        },
        clearMessage: () =>{
            return {message: ""}
        }
    }
})



export const {setMessage, clearMessage} = MessageSlicer.actions;
export default MessageSlicer.reducer;