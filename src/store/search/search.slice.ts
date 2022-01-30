import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchImages } from './search.thunk';
import { Image } from '../../types/image';
import { ApiImage } from '../../types/api/api-image';

export interface SearchState {
  loading: boolean;
  error: boolean;
  images: Image[];
}

const initialState: SearchState = {
  images: [],
  loading: false,
  error: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchImages.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(
      fetchImages.fulfilled,
      (state, action: PayloadAction<ApiImage[]>) => {
        state.images.push(
          ...action.payload.map(({ url, id }) => ({ url, id }))
        );
        state.loading = false;
        state.error = false;
      }
    );
  },
});

export const { reducer: searchReducer } = searchSlice;
