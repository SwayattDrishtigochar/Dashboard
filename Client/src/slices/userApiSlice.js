import { apiSlice } from './apiSlice';
const USERS_URL = '/api/user';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = userApiSlice;
