
import React from 'react';
import Dropzone, { IFileWithMeta, StatusValue, IDropzoneProps } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { Controller } from 'react-hook-form';
import 'app/modules/dataset/dataset-create/css/dataset-upload.scss';

export interface DatasetUploadProps {
  control: any,
  setCreatable: Function,
  creatable: boolean
}

export default function DatasetUpload(props: DatasetUploadProps) {
  const { control, setCreatable, creatable } = props

  const getUploadParams: IDropzoneProps['getUploadParams'] = () => ({
    url: 'https://httpbin.org/post'
  })

  const handleControlledDropzonChangeStatus = (status: StatusValue, allFiles: IFileWithMeta[], setFiles: Function) => {
    setTimeout(() => {
      if (['done', 'removed', 'headers_received'].includes(status)) {
        if (allFiles.length === 0) {
          setCreatable(false)
        } else {
          !creatable && setCreatable(true)
        }
        setFiles([...allFiles]);
      } else {
        creatable && setCreatable(false)
      }
    }, 0)
  };

  return (
    <Controller
      name='files'
      control={control}
      render={({ onChange }) => (
        <Dropzone
          getUploadParams={getUploadParams}
          inputWithFilesContent="+"
          onChangeStatus={
            (file, status, allFiles) => handleControlledDropzonChangeStatus(status, allFiles, onChange)
          }
          accept=".csv, .json, .zip"
          inputContent='Kéo thả file hoặc click vào đây để upload file'
          styles={{
            dropzone: { minHeight: 250, maxHeight: 300, marginBottom: 24 },
            inputLabelWithFiles: { fontSize: "xx-large", marginTop: 5, marginLeft: 5, fontWeight: 500 }
          }}
        />)}>
    </Controller>
  )
}