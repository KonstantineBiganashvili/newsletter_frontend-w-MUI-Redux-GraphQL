import { configureStore } from '@reduxjs/toolkit';
import articlesSlice from './articles-slice';
import modalsSlice from './modals-slice';

const store = configureStore({
  reducer: {
    modals: modalsSlice.reducer,
    articles: articlesSlice.reducer,
  },
});

export default store;
