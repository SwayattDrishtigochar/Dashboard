import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
  approved: [],
};

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    setApproved: (state, action) => {
      state.approved = action.payload;
    },
  },
});

export const { setRequests, setApproved } = requestSlice.actions;
export default requestSlice.reducer;
