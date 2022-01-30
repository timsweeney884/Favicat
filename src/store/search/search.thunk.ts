import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeApiRequest } from '../../services/api/api.service';

export const fetchImages = createAsyncThunk('seach/getImages', async () => {
  return await makeApiRequest<any>({
    path: 'images/search',
    searchParams: { limit: 20 },
  });
});
