import { apiSlice } from './apiSlice';
const ADMIN_URL = '/api/company';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRequests: builder.query({
      query: (companyId) => ({
        url: `${ADMIN_URL}/${companyId}/requests`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    getApprovedUsers: builder.query({
      query: (companyId) => ({
        url: `${ADMIN_URL}/${companyId}/users/approved`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetRequestsQuery, useGetApprovedUsersQuery } = adminApiSlice;
