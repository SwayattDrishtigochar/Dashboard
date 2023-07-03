import { createSlice } from '@reduxjs/toolkit';

const boilerSlice = createSlice({
  name: 'tableData',
  initialState: [],
  reducers: {
    addBoilerData: (state, action) => {
      state.push(action.payload);
    },
    removeBoilerData: (state, action) => {
      const index = state.findIndex((data) => data.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addBoilerData, removeBoilerData } = boilerSlice.actions;

export default boilerSlice.reducer;
