import { apiSlice } from '../slices/apiSlice';
const BOILER_URL = 'api/boiler';

export const boilerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    setBoilerData: builder.mutation({
      query: (data) => ({
        url: BOILER_URL,
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
    }),
    getBoilerData: builder.query({
      query: () => ({
        url: BOILER_URL,
        credentials: 'include',
        method: 'GET',
      }),
    }),
    deleteBoilerData: builder.mutation({
      query: (id) => ({
        url: `${BOILER_URL}/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useSetBoilerDataMutation,
  useGetBoilerDataQuery,
  useDeleteBoilerDataMutation,
} = boilerApiSlice;
