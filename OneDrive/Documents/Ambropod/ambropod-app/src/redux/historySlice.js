import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    listenedEpisodes: JSON.parse(localStorage.getItem('listenedEpisodes')) || [],
  },
  reducers: {
    addToHistory: (state, action) => {
      if (!state.listenedEpisodes.includes(action.payload)) {
        state.listenedEpisodes.push(action.payload);
        localStorage.setItem('listenedEpisodes', JSON.stringify(state.listenedEpisodes));
      }
    },
    resetHistory: (state) => {
      state.listenedEpisodes = [];
      localStorage.removeItem('listenedEpisodes');
    },
  },
});

export const { addToHistory, resetHistory } = historySlice.actions;

export default historySlice.reducer;

