import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./slicers/CategorySlicer";
import userReducer from "./slicers/UserSlicer";
import messageReducer from "./slicers/MessageSlicer";
import productReducer from "./slicers/ProductSlicer";


export default configureStore({
    reducer: {
        category: categoryReducer,
        adminUser: userReducer,
        message: messageReducer,
        products: productReducer
    }
})