import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchImages } from './images.thunk';
import { Image } from '../../types/image';
import { ApiImage } from '../../types/api/api-image';

export interface ImagesState {
  loading: boolean;
  error: boolean;
  publicImages: Image[];
  uploadedImages: Image[];
}

const initialState: ImagesState = {
  publicImages: [],
  uploadedImages: [],
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
      (
        state,
        action: PayloadAction<{ images: ApiImage[]; isPublic: boolean }>
      ) => {
        state.loading = false;
        state.error = false;

        const images = action.payload.images.map(({ url, id }) => ({
          url,
          id,
        }));

        action.payload.isPublic
          ? (state.publicImages = images)
          : (state.uploadedImages = images);
      }
    );
  },
});

export const { reducer: imagesReducer } = imagesSlice;
