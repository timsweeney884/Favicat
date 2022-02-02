import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FileInput } from '../../components/file-input/file-input.component';
import { useAppDispatch } from '../../hooks/app-dispatch.hook';
import { uploadImage } from '../../store/upload/upload.thunk';
import { getLoading } from '../../store/upload/upload.selectors';
import { Loader } from '../../components/loader/loader.component';
import { APP_ROUTES } from '../../constants/app-routes.constants';
import { Error } from '../../components/error/error.component';

export const Upload: React.FC = () => {
  const [apiError, setApiError] = useState('');
  const loading = useSelector(getLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSelectImage = () => {
    setApiError('');
  };

  const onUpload = (file: File) => {
    dispatch(uploadImage(file))
      .unwrap()
      .then(() => {
        navigate(APP_ROUTES.HOME.path);
      })
      .catch((error) => {
        setApiError(error.message);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <FileInput onUpload={onUpload} onSelectImage={onSelectImage} />
      {apiError && <Error heading="Something went wrong!" message={apiError} />}
    </>
  );
};
