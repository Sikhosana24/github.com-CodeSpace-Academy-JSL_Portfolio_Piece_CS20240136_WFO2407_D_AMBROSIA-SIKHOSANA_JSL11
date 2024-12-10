import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShows, fetchShowDetails } from '../services/api';

export const getShows = createAsyncThunk('shows/getShows', async () => {
  const response = await fetchShows();
  return response;
});

export const getShowDetails = createAsyncThunk('shows/getShowDetails', async (id) => {
  const response = await fetchShowDetails(id);
  return response;
});

const showsSlice = createSlice({
  name: 'shows',
  initialState: {
    list: [],
    currentShow: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    sortShows: (state, action) => {
      switch (action.payload) {
        case 'asc':
          state.list.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'desc':
          state.list.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'recent':
          state.list.sort((a, b) => new Date(b.updated) - new Date(a.updated));
          break;
        case 'oldest':
          state.list.sort((a, b) => new Date(a.updated) - new Date(b.updated));
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(getShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getShowDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getShowDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentShow = action.payload;
      })
      .addCase(getShowDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { sortShows } = showsSlice.actions;

export default showsSlice.reducer;

