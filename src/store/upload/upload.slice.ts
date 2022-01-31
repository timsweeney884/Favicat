import { createSlice } from '@reduxjs/toolkit';
import { uploadImage } from './upload.thunk';

export interface UploadState {
  loading: boolean;
}

const initialState: UploadState = {
  loading: false,
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadImage.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadImage.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer: uploadReducer } = uploadSlice;
