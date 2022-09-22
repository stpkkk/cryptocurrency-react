//API options, This API we connect in store in reducer
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //!exact path

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "279c8c83a2msh7f3de356d2f9f23p195a40jsn93f59f5a71ec",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
}; //Headers это методанные API

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest("/coins"),
    }),
  }),
});

export const { useGetCryptosQuery }: any = cryptoApi;

// export const options = {
//   method: "GET",
//   url: "https://coinranking1.p.rapidapi.com/coins",
//   params: {
//     referenceCurrencyUuid: "yhjMzLPhuIDl",
//     timePeriod: "24h",
//     "tiers[0]": "1",
//     orderBy: "marketCap",
//     orderDirection: "desc",
//     limit: "50",
//     offset: "0",
//   },
//   headers: {
//     "X-RapidAPI-Key": "279c8c83a2msh7f3de356d2f9f23p195a40jsn93f59f5a71ec",
//     "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
//   },
// };
