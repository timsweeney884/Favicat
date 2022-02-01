import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/app-dispatch.hook';
import { fetchImages } from '../../store/images/images.thunk';
import * as imagesSelectors from '../../store/images/images.selectors';
import { ImagePanel } from '../../components/image-panel/image-panel.component';
import { Grid } from '../../components/grid/grid.component';
import { GridColumn } from '../../components/grid/grid-tem.component';
import { Loader } from '../../components/loader/loader.component';
import { Error } from '../../components/error/error.component';

export const MoreCats: React.FC = () => {
  const loading = useSelector(imagesSelectors.getLoading);
  const error = useSelector(imagesSelectors.getError);
  const images = useSelector(imagesSelectors.getPublicImages);
  const dispatch = useAppDispatch();

  const errorHeading = 'Something went wrong!';
  const errorMessage = `Sorry we couldn't show you any cats, maybe upload some instead and try later?`;

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error heading={errorHeading} message={errorMessage} />;
  }

  return (
    <Grid>
      {images.map(({ id, url }) => (
        <GridColumn key={`image-${id}`}>
          {/* <ImagePanel imgSrc={url} /> */}
        </GridColumn>
      ))}
    </Grid>
  );
};
