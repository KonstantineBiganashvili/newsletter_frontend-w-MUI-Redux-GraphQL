import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    page: 0,
  },

  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
  },
});

export const paginationActions = paginationSlice.actions;

export default paginationSlice;
