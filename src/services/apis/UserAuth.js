import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = `${process.env.REACT_APP_API_ENDPOINT}`;

export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('userToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
        query: (data) => {
            return {
                url: "api/login",
                method: "POST",
                body: data,
            };
        },
    }),
  }),
});

export const { useLoginUserMutation } = userAuthApi;
