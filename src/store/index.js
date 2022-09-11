import { configureStore } from '@reduxjs/toolkit';
import articlesSlice from './articles-slice';
import filterSlice from './filter-slice';
import modalsSlice from './modals-slice';
import paginationSlice from './pagiantion-slice';

const store = configureStore({
  reducer: {
    modals: modalsSlice.reducer,
    articles: articlesSlice.reducer,
    filter: filterSlice.reducer,
    pagination: paginationSlice.reducer,
  },
});

export default store;
