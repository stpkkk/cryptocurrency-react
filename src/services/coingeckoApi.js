//API options, API we connect in store in reducer
//https://www.coingecko.com/ru/api/documentation
//TODO TS https://redux-toolkit.js.org/rtk-query/overview
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //!exact path


const baseUrl = "https://api.coingecko.com/api/v3";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => `/coins?limit=${count}`,
    }),

    getGlobalStats: builder.query({
      query: () => `/global`,
    }),
  }),
});

export const {
  //   useGetExchangesQuery,
} = cryptoApi;
