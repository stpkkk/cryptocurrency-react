import { configureStore } from "@reduxjs/toolkit";

import { coinRankingApi} from "../services/coinRankingApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

export default configureStore({
  reducer: {
    [coinRankingApi.reducerPath]: coinRankingApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoNewsApi.middleware, coinRankingApi.middleware),
});
