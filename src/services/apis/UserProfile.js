// src/services/apis/UserAuth.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('userToken');

      console.log('Token:', token); // Debugging (remove in production)

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json'); // Ensure JSON requests

      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/api/user/update', // Ensure leading slash
        method: 'PUT',
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: '/api/user/profile', // Ensure leading slash
        method: 'GET',
      }),
    }),
  }),
});

export const { useUpdateUserMutation, useGetProfileQuery } = profileApi;
