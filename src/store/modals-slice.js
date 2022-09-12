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
    editInputs: {
      title: '',
      categoryId: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      date: '',
      content: '',
    },
    readMoreModal: {
      id: '',
      open: '',
    },
    deleteModal: {
      id: '',
      open: '',
    },
  },

  reducers: {
    setInput(state, action) {
      state.inputs = {
        ...state.inputs,
        [action.payload.name]: action.payload.value,
      };
    },

    setEditInputs(state, action) {
      state.editInputs = {
        ...state.editInputs,
        [action.payload.name]: action.payload.value,
      };
    },

    setInitialEditValues(state, action) {
      state.editInputs = action.payload;
    },

    clearInput(state, action) {
      state.inputs = action.payload;
    },

    setOpenMoreModal(state, action) {
      state.readMoreModal = action.payload;
    },

    setDeleteModal(state, action) {
      state.deleteModal = action.payload;
    },
  },
});

export const modalsActions = modalsSlice.actions;

export default modalsSlice;
