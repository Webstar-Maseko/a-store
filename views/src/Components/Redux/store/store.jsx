import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./slicers/CategorySlicer";
import ProductReducer from "./slicers/ProductSlicer";
import UserReducer from "./slicers/UserSlicer";
import MessageReducer from "./slicers/MessageSlicer";
import CartReducer from "./slicers/CartSlicer";
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE,PERSIST, PURGE, REGISTER} from "redux-persist"; 
import storage from "redux-persist/lib/storage";

const persistConfig ={
  key:'root', 
  storage
}

const persistedReducer = persistReducer(persistConfig,CartReducer)
export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    product: ProductReducer,
    client: UserReducer,
    message: MessageReducer,
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
      }
    }),
  
});
export const persistor = persistStore(store)