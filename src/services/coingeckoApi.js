//API options, API we connect in store in reducer
//https://www.coingecko.com/ru/api/documentation
//TODO TS https://redux-toolkit.js.org/rtk-query/overview
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //!exact path

const baseUrl = "https://api.coingecko.com/api/v3";

export const coingeckoApi = createApi({
  reducerPath: "coingeckoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosCoingeckoApi: builder.query({
      query: () => `/coins`,
    }),

    // getCryptoDetails: builder.query({
    // 	query: (coinId) => `/coin/${coinId}`,
    //   }),

    // getGlobalStats: builder.query({
    //   query: () => `/global`,
    // }),

    getChartData: builder.query({
      query: ({ id, days }) =>
        `/coins/${id}/market_chart?vs_currency=usd&days=${days}'`,
    }),
  }),
});

export const {
  useGetChartDataQuery,
  useGetCryptosCoingeckoApiQuery,
  useGetCryptoDetailsQuery,
} = coingeckoApi;
