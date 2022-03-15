import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TrainersModel, DashboardModel, UserModel } from "./models";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["dashboard", "trainers"],
  transforms: [
    encryptTransform({
      secretKey: "cdsa_secretKey",
      onError: (err) => {
        console.log(err);
      },
    }),
  ],
};

const reducers = combineReducers({
  user: UserModel,
  trainers: TrainersModel,
  dashboard: DashboardModel,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
export default store;
