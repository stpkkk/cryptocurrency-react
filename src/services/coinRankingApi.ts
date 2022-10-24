//API options, API we connect in store in reducer
//https://rapidapi.com/Coinranking/api/coinranking1/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //!exact path

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "279c8c83a2msh7f3de356d2f9f23p195a40jsn93f59f5a71ec",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
}; //Headers это методанные API

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const coinRankingApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest(`/coins`),
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${days} to this - `coin/${coinId}/history?days=${days}`
    getCryptoHistory: builder.query({
      query: ({ coinId, days }) =>
        createRequest(`/coin/${coinId}/history?days=${days}`),
    }),

    // Note: To access this endpoint you need premium plan
    // getExchanges: builder.query({
    //   query: () => createRequest('/exchanges'),
    // }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  //   useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = coinRankingApi;
