import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeApiRequest } from '../../services/api/api.service';
import { ApiImage } from '../../types/api/api-image';
import { ImageType } from '../../types/image-type';

export const fetchImages = createAsyncThunk(
  'images/getImages',
  async (imageType: ImageType = 'Public') => {
    const isPublic = imageType === 'Public';
    const path = imageType === 'Public' ? 'images/search' : 'images';

    const images = await makeApiRequest<ApiImage[]>({
      path,
      searchParams: { limit: 20 },
    });

    return {
      images,
      isPublic,
    };
  }
);
