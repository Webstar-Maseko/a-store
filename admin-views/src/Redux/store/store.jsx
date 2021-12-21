import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./slicers/CategorySlicer";

export default configureStore({
    reducer: {
        category: categoryReducer,
    }
})