//https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=DevRel&utm_campaign=DevRel
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //!exact path

const cryptoNewsHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "279c8c83a2msh7f3de356d2f9f23p195a40jsn93f59f5a71ec",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
}; //Headers это методанные API

const baseUrl = "https://bing-news-search2.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});//newsCategory to filter news

export const { useGetNewsQuery }: any = cryptoNewsApi;
