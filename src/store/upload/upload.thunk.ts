import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeApiRequest } from '../../services/api.service';
import { ApiUpload } from '../../types/api/api-upload';
import { ApiError } from '../../types/api/api-error';

export const uploadImage = createAsyncThunk(
  'upload/uploadImage',
  async (image: File) => {
    const body = new FormData();

    body.append('file', image);

    const response = await makeApiRequest({
      isJSON: false,
      path: 'images/upload',
      method: 'POST',
      body,
    });

    if (response.ok) {
      const data: ApiUpload[] = await response.json();

      return data;
    } else {
      const error: ApiError = await response.json();

      throw error;
    }
  }
);
