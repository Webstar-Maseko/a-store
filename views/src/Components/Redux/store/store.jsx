import {configureStore} from "@reduxjs/toolkit";
import CategoryReducer from "./slicers/CategorySlicer"

export default configureStore({
    reducer: {
        category: CategoryReducer
    }
})