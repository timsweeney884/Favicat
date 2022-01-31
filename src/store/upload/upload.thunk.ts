import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeApiRequest } from '../../services/api/api.service';
import { ApiUpload } from '../../types/api/api-upload';

export const uploadImage = createAsyncThunk(
  'upload/uploadImage',
  async (image: File) => {
    const body = new FormData();

    body.append('file', image);

    return await makeApiRequest<ApiUpload>({
      path: 'images/upload',
      method: 'POST',
      body,
    });
  }
);
