import { createSlice } from "@reduxjs/toolkit";


export const CartSlicer = createSlice({
    name: "cart",
    initialState:{
        cart:[],
    },
    reducers:{
        adddToCart: (state,action) =>{
            console.log(action.payload.id)
            const itemInCart = state.cart.find(item => item.id === action.payload.id);
            if(itemInCart){
                itemInCart.quantity++;
            }else{
                state.cart.push(action.payload)
            }
        },
        addQuantity:(state,action) =>{
            const item = state.cart.find(item => item.id === action.payload.id);
            item.quantity++;
        },
        decreaseQuantiy: (state, action) =>{
            const item = state.cart.find(item => item.id === action.payload.id);
            item.quantity--;
        }
    }
}

);
export default CartSlicer.reducer;
export const {adddToCart,addQuantity,decreaseQuantiy} = CartSlicer.actions;
