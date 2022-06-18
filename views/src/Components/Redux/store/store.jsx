import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./slicers/CategorySlicer";
import ProductReducer from "./slicers/ProductSlicer";
import UserReducer from "./slicers/UserSlicer";
import MessageReducer from "./slicers/MessageSlicer";
export default configureStore({
  reducer: {
    category: CategoryReducer,
    product: ProductReducer,
    client: UserReducer,
    message: MessageReducer,
  },
});
