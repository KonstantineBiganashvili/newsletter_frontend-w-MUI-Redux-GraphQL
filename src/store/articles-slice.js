import { createSlice } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    categories: [],
  },

  reducers: {
    setArticles(state, action) {
      state.articles = action.payload;
    },

    setCategories(state, action) {
      state.categories = action.payload;
    },

    addArticle(state, action) {
      state.articles = [...state.articles, action.payload];
    },

    deleteArticle(state, action) {
      state.articles = action.payload;
    },
  },
});

export const articlesActions = articlesSlice.actions;

export default articlesSlice;
