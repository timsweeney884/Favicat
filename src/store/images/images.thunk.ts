import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeApiRequest } from '../../services/api.service';
import { ApiImage } from '../../types/api/api-image';

export const fetchImages = createAsyncThunk('images/getImages', async () => {
  const response: Response = await makeApiRequest({
    path: 'images',
    searchParams: { limit: 20 },
  });

  const images: ApiImage[] = await response.json();

  return {
    images: images.map(({ url, id }) => ({
      url,
      id,
    })),
  };
});
