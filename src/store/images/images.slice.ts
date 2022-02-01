import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchImages } from './images.thunk';
import { Image } from '../../types/image';

export interface ImagesState {
  images: Image[];
  loading: boolean;
  error: boolean;
}

const initialState: ImagesState = {
  images: [],
  loading: false,
  error: false,
};

export const imagesSlice = createSlice({
  name: 'images',
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
      (state, action: PayloadAction<{ images: Image[] }>) => {
        state.loading = false;
        state.images = action.payload.images;
      }
    );
  },
});

export const { reducer: imagesReducer } = imagesSlice;
