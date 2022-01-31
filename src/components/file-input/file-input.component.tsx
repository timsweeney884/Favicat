import { SyntheticEvent, useRef, useState } from 'react';
import { Button } from '../button/button.component';
import styles from './file-input.module.css';

interface IFileInput {
  onUpload: (file: File) => void;
}

export const FileInput: React.FC<IFileInput> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImgSrc, setUploadedImgSrc] = useState('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const file =
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files[0];

    if (file) {
      onUpload(file);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];

    if (image) {
      setUploadedImgSrc(URL.createObjectURL(image));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContent}>
        <div className={styles.fileInputLabelContainer}>
          <label className={styles.fileInputLabel} htmlFor="file-upload">
            Click here to choose a file
            <input
              onChange={onChange}
              className={styles.fileInput}
              id="file-upload"
              type="file"
              ref={fileInputRef}
            />
          </label>
        </div>
        {uploadedImgSrc && (
          <div>
            <img className={styles.previewImage} src={uploadedImgSrc} alt="" />
            <Button type="submit">Upload</Button>
          </div>
        )}
      </div>
    </form>
  );
};
