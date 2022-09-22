import { configureStore } from "@reduxjs/toolkit";
// import chartReducer from "./chartsSlice";
import { cryptoApi } from "../services/cryptoApi";

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
