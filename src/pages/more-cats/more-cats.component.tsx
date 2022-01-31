import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/app-dispatch.hook';
import { fetchImages } from '../../store/search/search.thunk';
import * as searchSelectors from '../../store/search/search.selectors';
import { ImagePanel } from '../../components/image-panel/image-panel.component';
import { Grid } from '../../components/grid/grid.component';
import { GridColumn } from '../../components/grid/grid-tem.component';
import { Loader } from '../../components/loader/loader.component';
import { Error } from '../../components/error/error.component';

export const MoreCats: React.FC = () => {
  const loading = useSelector(searchSelectors.getLoading);
  const error = useSelector(searchSelectors.getError);
  const images = useSelector(searchSelectors.getImages);
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

  if (!images.length) {
    return null;
  }

  return (
    <Grid>
      {images.map(({ url }) => (
        <GridColumn>
          <ImagePanel imgSrc={url} />
        </GridColumn>
      ))}
    </Grid>
  );
};
