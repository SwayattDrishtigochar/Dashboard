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
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forget-password`,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}/${data.token}`,
        method: 'POST',
        body: data.password,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = userApiSlice;
