import { configureStore } from '@reduxjs/toolkit';
import showsReducer from './showsSlice';
import favoritesReducer from './favoritesSlice';
import historyReducer from './historySlice';

export const store = configureStore({
  reducer: {
    shows: showsReducer,
    favorites: favoritesReducer,
    history: historyReducer,
  },
});

