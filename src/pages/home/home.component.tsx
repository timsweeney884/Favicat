import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/app-dispatch.hook';
import { fetchImages } from '../../store/images/images.thunk';
import { Loader } from '../../components/loader/loader.component';
import { Error } from '../../components/error/error.component';
import { Grid } from '../../components/grid/grid.component';
import { GridColumn } from '../../components/grid/grid-tem.component';
import { ImagePanel } from '../../components/image-panel/image-panel.component';
import { deleteVote, fetchVotes, voteImage } from '../../store/vote/vote.thunk';

import * as imagesSelectors from '../../store/images/images.selectors';
import * as voteSelectors from '../../store/vote/vote.selectors';
import * as favoritesSelectors from '../../store/favorites/favorites.selectors';
import {
  favoriteImage,
  fetchFavorites,
  deleteFavorite,
} from '../../store/favorites/favorites.thunk';

export const Home: React.FC = () => {
  const imagesLoading = useSelector(imagesSelectors.getLoading);
  const imagesError = useSelector(imagesSelectors.getError);
  const images = useSelector(
    imagesSelectors.getUploadedImagesWithVotesAndFavorites
  );
  const votesLoading = useSelector(voteSelectors.getLoading);
  const voteIsSubmitting = useSelector(voteSelectors.getVoteIsSubmitting);
  const voteIsDeleting = useSelector(voteSelectors.getVoteIsDeleting);
  const votesError = useSelector(voteSelectors.getError);
  const favoritesLoading = useSelector(favoritesSelectors.getLoading);
  const favoriteIsSubmitting = useSelector(favoritesSelectors.getFavoriteIsSubmitting);
  const favoriteIsDeleting = useSelector(favoritesSelectors.getFavoriteIsDeleting);
  const favoritesError = useSelector(favoritesSelectors.getError);
  const dispatch = useAppDispatch();

  const errorHeading = 'Something went wrong!';
  const errorMessage = `Sorry we couldn't show you any of your uploaded images, maybe try and upload some?`;

  useEffect(() => {
    dispatch(fetchImages());
    dispatch(fetchVotes());
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (imagesLoading || votesLoading || favoritesLoading) {
    return <Loader />;
  }

  if (imagesError || votesError || favoritesError) {
    return <Error heading={errorHeading} message={errorMessage} />;
  }

  if (!images.length) {
    return (
      <p>You haven't added images yet, go to the upload page to add some!</p>
    );
  }

  const onVote = (imgId: string) => (value: number) => {
    dispatch(
      voteImage({
        imgId,
        value,
      })
    );
  };

  const onFavorite = (imgId: string) => () => {
    dispatch(
      favoriteImage({
        imgId,
      })
    );
  };

  const onDeleteVote = (imgId: string) => (voteValue: number) => {
    dispatch(deleteVote({
      imgId,
      voteValue,
    }));
  }

  const onUnfavorite = (favoriteId?: number) => () => {
    favoriteId && dispatch(deleteFavorite(favoriteId));
  };

  return (
    <Grid>
      {images.map(({ id, url, isUpvote, isDownVote, favoriteId, voteCount }) => (
        <GridColumn key={`image-${id}`}>
          <ImagePanel
            imgSrc={url}
            isCurrentUpVote={isUpvote}
            isCurrentDownVote={isDownVote}
            isCurrentFavorite={Boolean(favoriteId)}
            voteCount={voteCount}
            voteIsSubmitting={voteIsSubmitting}
            voteIsDeleting={voteIsDeleting}
            favoriteIsSubmitting={favoriteIsSubmitting}
            favoriteIsDeleting={favoriteIsDeleting}
            onDeleteVote={onDeleteVote(id)}
            onVote={onVote(id)}
            onUnfavorite={onUnfavorite(favoriteId)}
            onFavorite={onFavorite(id)}
          />
        </GridColumn>
      ))}
    </Grid>
  );
};
