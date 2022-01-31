import { FileInput } from '../../components/file-input/file-input.component';
import { useAppDispatch } from '../../hooks/app-dispatch.hook';
import { uploadImage } from '../../store/upload/upload.thunk';
import { useSelector } from 'react-redux';
import { getLoading } from '../../store/upload/upload.selectors';
import { Loader } from '../../components/loader/loader.component';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../constants/app-routes.constants';
import { Error } from '../../components/error/error.component';
import { useState } from 'react';

export const Upload: React.FC = () => {
  const [apiError, setApiError] = useState('');
  const loading = useSelector(getLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  if (apiError) {
    return <Error heading="Something went wrong!" message={apiError} />;
  }

  return <FileInput onUpload={onUpload} />;
};
