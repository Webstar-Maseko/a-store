import {configureStore} from "@reduxjs/toolkit";
import CategoryReducer from "./slicers/CategorySlicer";
import ProductReducer from "./slicers/ProductSlicer";
export default configureStore({
    reducer: {
        category: CategoryReducer,
        product:ProductReducer
    }
})