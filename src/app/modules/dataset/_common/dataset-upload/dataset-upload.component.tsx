import React from 'react';
import Dropzone, {
  IFileWithMeta,
  StatusValue,
  IDropzoneProps,
} from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { Controller } from 'react-hook-form';
import './dataset-upload.scss';

export interface DatasetUploadProps {
  control: any;
  setCreatable: Function;
  creatable: boolean;
}

export default function DatasetUpload(props: DatasetUploadProps) {
  const { control, setCreatable, creatable } = props;

  const getUploadParams: IDropzoneProps['getUploadParams'] = () => ({
    url: 'https://httpbin.org/post',
  });

  const handleControlledDropzonChangeStatus = (
    status: StatusValue,
    allFiles: IFileWithMeta[],
    setFiles: Function
  ) => {
    setTimeout(() => {
      if (['done', 'removed', 'headers_received'].includes(status)) {
        if (allFiles.length === 0) {
          setCreatable(false);
        } else {
          !creatable && setCreatable(true);
        }
        setFiles([...allFiles]);
      } else {
        creatable && setCreatable(false);
      }
    }, 0);
  };

  return (
    <Controller
      name='files'
      control={control}
      render={({ onChange }) => (
        <Dropzone
          getUploadParams={getUploadParams}
          inputWithFilesContent='+'
          onChangeStatus={(file, status, allFiles) =>
            handleControlledDropzonChangeStatus(status, allFiles, onChange)
          }
          maxSizeBytes={1024 * 1024 * 50}
          accept='.csv, .json, .zip'
          maxFiles={5}
          inputContent={
            <p>
              Kéo thả file hoặc click vào đây để upload file. <br /> Tổng dung
              lượng file nhỏ hơn 50MB. Tối đa 5 file
            </p>
          }
          styles={{
            dropzone: { minHeight: 250, maxHeight: 300, marginBottom: 24 },
            inputLabelWithFiles: {
              fontSize: 'xx-large',
              marginTop: 5,
              marginLeft: 5,
              fontWeight: 500,
            },
          }}
        />
      )}
    ></Controller>
  );
}
