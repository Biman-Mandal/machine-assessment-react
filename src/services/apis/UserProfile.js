// src/services/apis/UserAuth.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      let token = localStorage.getItem('userToken');
      if (token) {
        token = token.replace(/^"|"$/g, '');
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/api/user/update',
        method: 'PUT',
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: '/api/user/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { useUpdateUserMutation, useGetProfileQuery } = profileApi;
