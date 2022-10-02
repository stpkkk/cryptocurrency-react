import { configureStore } from "@reduxjs/toolkit";

import { coinRankingApi } from "../services/coinRankingApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { coingeckoApi } from "../services/coingeckoApi";

export default configureStore({
  reducer: {
    [coinRankingApi.reducerPath]: coinRankingApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [coingeckoApi.reducerPath]: coingeckoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptoNewsApi.middleware,
      coinRankingApi.middleware,
      coingeckoApi.middleware
    ),
});
