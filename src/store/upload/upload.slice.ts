import { createSlice } from '@reduxjs/toolkit';
import { uploadImage } from './upload.thunk';

export interface UploadState {
  loading: boolean;
  error: boolean;
}

const initialState: UploadState = {
  loading: false,
  error: false,
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(uploadImage.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(uploadImage.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
  },
});

export const { reducer: uploadReducer } = uploadSlice;
