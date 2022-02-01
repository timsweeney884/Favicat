import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/app-dispatch.hook';
import { fetchImages } from '../../store/images/images.thunk';
import { Loader } from '../../components/loader/loader.component';
import { Error } from '../../components/error/error.component';
import * as imagesSelectors from '../../store/images/images.selectors';
import * as voteSelectors from '../../store/vote/vote.selectors';
import { Grid } from '../../components/grid/grid.component';
import { GridColumn } from '../../components/grid/grid-tem.component';
import { ImagePanel } from '../../components/image-panel/image-panel.component';
import { fetchVotes, voteImage } from '../../store/vote/vote.thunk';

export const Home: React.FC = () => {
  const imagesLoading = useSelector(imagesSelectors.getLoading);
  const imagesError = useSelector(imagesSelectors.getError);
  const images = useSelector(imagesSelectors.getUploadedImagesWithVotes);
  const votesLoading = useSelector(voteSelectors.getLoading);
  const votesError = useSelector(voteSelectors.getError);
  const dispatch = useAppDispatch();

  const errorHeading = 'Something went wrong!';
  const errorMessage = `Sorry we couldn't show you any of your uploaded images, maybe try and upload some?`;

  useEffect(() => {
    dispatch(fetchImages('Upload'));
    dispatch(fetchVotes());
  }, [dispatch]);

  if (imagesLoading || votesLoading) {
    return <Loader />;
  }

  if (imagesError || votesError) {
    return <Error heading={errorHeading} message={errorMessage} />;
  }

  const onVote = (imgId: string) => (value: number) => {
    dispatch(
      voteImage({
        imgId,
        value,
      })
    );
  };

  return (
    <Grid>
      {images.map(({ id, url, voteCount }) => (
        <GridColumn key={`image-${id}`}>
          <p>{id}</p>
          <ImagePanel voteCount={voteCount} onVote={onVote(id)} imgSrc={url} />
        </GridColumn>
      ))}
    </Grid>
  );
};
