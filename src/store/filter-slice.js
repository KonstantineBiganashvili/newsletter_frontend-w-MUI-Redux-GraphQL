import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filterDate: { from: '', to: '' },
    openFilter: false,
  },

  reducers: {
    setFilterDate(state, action) {
      state.filterDate = {
        ...state.filterDate,
        [action.payload.name]: action.payload.data,
      };
    },
    setOpenFilter(state, action) {
      state.openFilter = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
