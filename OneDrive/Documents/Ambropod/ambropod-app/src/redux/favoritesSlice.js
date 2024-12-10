import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    episodes: JSON.parse(localStorage.getItem('favorites')) || [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.episodes.push({
        ...action.payload,
        addedAt: new Date().toISOString(),
      });
      localStorage.setItem('favorites', JSON.stringify(state.episodes));
    },
    removeFavorite: (state, action) => {
      state.episodes = state.episodes.filter(
        (episode) => episode.id !== action.payload.id
      );
      localStorage.setItem('favorites', JSON.stringify(state.episodes));
    },
    sortFavorites: (state, action) => {
      switch (action.payload) {
        case 'asc':
          state.episodes.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'desc':
          state.episodes.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'recent':
          state.episodes.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
          break;
        case 'oldest':
          state.episodes.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
          break;
        default:
          break;
      }
    },
  },
});

export const { addFavorite, removeFavorite, sortFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;

