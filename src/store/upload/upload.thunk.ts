import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeApiRequest } from '../../services/api/api.service';
import { ApiUpload } from '../../types/api/api-upload';
import { ApiUploadError } from '../../types/api/api-upload-error';

export const uploadImage = createAsyncThunk(
  'upload/uploadImage',
  async (image: File) => {
    const body = new FormData();

    body.append('file', image);

    const response = await makeApiRequest({
      path: 'images/upload',
      method: 'POST',
      body,
    });

    if (response.ok) {
      const data: ApiUpload[] = await response.json();

      return data;
    } else {
      const error: ApiUploadError = await response.json();

      throw error;
    }
  }
);
