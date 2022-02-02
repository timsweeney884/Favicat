import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeApiRequest } from '../../services/api.service';
import { getSubId } from '../../utils/get-sub-id';
import { ApiFavorite } from '../../types/api/api-favorite';
import { Favorite } from '../../types/favorite';
import { ApiFavoriteSubmit } from '../../types/api/api-favorite-submit';

export const favoriteImage = createAsyncThunk(
  'favorite/favoriteImage',
  async ({ imgId }: Pick<Favorite, 'imgId'>) => {
    const body = JSON.stringify({
      image_id: imgId,
      sub_id: getSubId(),
    });

    const response = await makeApiRequest({
      path: 'favourites',
      method: 'POST',
      body,
    });

    const favorite: ApiFavoriteSubmit = await response.json();

    return {
      favoriteId: favorite.id,
      imgId,
    };
  }
);

export const fetchFavorites = createAsyncThunk(
  'favorite/fetchFavorites',
  async () => {
    const response = await makeApiRequest({
      path: 'favourites',
      method: 'GET',
      searchParams: {
        sub_id: `${getSubId()}`,
      },
    });

    const favorites: ApiFavorite[] = await response.json();

    return favorites.map((favorite) => ({
      favoriteId: favorite.id,
      imgId: favorite.image_id,
    }));
  }
);

export const deleteFavorite = createAsyncThunk(
  'favorite/deleteFavorite',
  async (favoriteId: number) => {
    const response = await makeApiRequest({
      path: `favourites/${favoriteId}`,
      method: 'DELETE',
    });

    await response.json();

    return {
      favoriteId,
    };
  }
);
