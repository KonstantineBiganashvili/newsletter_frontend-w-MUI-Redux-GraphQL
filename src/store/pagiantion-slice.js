import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    page: 0,
    pageCount: 0,
  },

  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
    changePageCount(state, action) {
      state.pageCount = action.payload;
    },
  },
});

export const paginationActions = paginationSlice.actions;

export default paginationSlice;
