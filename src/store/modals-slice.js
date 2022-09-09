import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    inputs: {
      title: '',
      categoryId: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      date: '',
      content: '',
    },
  },

  reducers: {
    setInput(state, action) {
      state.inputs = {
        ...state.inputs,
        [action.payload.name]: action.payload.value,
      };
    },

    clearInput(state, action) {
      state.inputs = action.payload;
    },
  },
});

export const modalsActions = modalsSlice.actions;

export default modalsSlice;
