import { FileInput } from '../../components/file-input/file-input.component';
import { useAppDispatch } from '../../hooks/app-dispatch.hook';
import { uploadImage } from '../../store/upload/upload.thunk';

export const Upload: React.FC = () => {
  const dispatch = useAppDispatch();

  const onUpload = (file: File) => {
    dispatch(uploadImage(file));
  };

  return <FileInput onUpload={onUpload} />;
};
