import {
  Button,
  Container,
  IconButton,

  TextField,
  Typography
} from '@material-ui/core';
import { Link } from '@material-ui/icons';
import UploadFileAPI from 'api/dataset-api';
import { STATUS_OK } from 'services/axios/common-services.const';
import { DatasetVisibility } from 'app/modules/dataset/_common/common.const';
import TinyMCEEditor from 'dataworld/blocks/tinymce-editor/tinymce-editor.component';
import addToast from 'dataworld/parts/toast/add-toast.component';
import React, { useEffect, useRef, useState } from 'react';
import { IFileWithMeta } from 'react-dropzone-uploader';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'store';
import DatasetSelectVisibility from '../components/dataset-select-visibility.component';
import DatasetUpload from '../../_common/dataset-upload/dataset-upload.component';
import '../css/dataset-create.scss';
import Footer from 'dataworld/blocks/footer/footer.component';

interface IUploads {
  files: IFileWithMeta[],
  title: string,
  url: string,
  visibility: string,
}

export default function DatasetCreate() {
  const [creatable, setCreatable] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.auth.user)
  const [description, setDescription] = useState('')
  const apiResult = useRef<HTMLElement>(null)
  const history = useHistory()

  const { register, handleSubmit, control, errors, watch } = useForm<IUploads>({
    defaultValues: {
      files: [],
      title: '',
      url: '',
      visibility: DatasetVisibility.PRIVATE_DATASET.toString()
    }
  })
  const handleCopyLink = () => {
    const el = document.createElement('textarea');
    el.value = `http://localhost:5500/${user.username}/${watch('url')}`;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  const onSubmit = async (data: IUploads) => {
    const { title, url, files, visibility } = data
    const formData = new FormData()
    formData.append('username', user.username)
    formData.append('title', title.trim())
    formData.append('url', url)
    formData.append('description', description)
    formData.append('visibility', visibility.toString())
    formData.append('accountId', user.accountId)
    files.forEach((file: any) =>
      formData.append('files', file.file)
    )

    const result = await UploadFileAPI.uploadDataset(formData)
    if (result.status === STATUS_OK) {
      addToast({ message: result.message, type: "success" })
      history.push(`/dataset/${user.username}/${url}`)
    } else {
      if (apiResult.current !== null) {
        apiResult.current.innerHTML = result.message
      }
    }
  }

  useEffect(() => {
    document.title = 'Tạo mới Dataset'
  }, [])

  return (
    <>
      <Container component='main' className='h-mt-100 h-mb-100'>
        <div className='t-dataset-create h-mb-40'>
          <div className='-bottom-line'>
            <Typography variant='h5' className='h-mb-4 f-weight-700'>
              Tạo mới Dataset
            </Typography>

            <Typography className='h-mb-24 p-gray-color-typography -italic-style'>
              Dataset bao gồm 1 hoặc nhiều file. Các file chỉ có thể có các định dạng: csv, json
            </Typography>
          </div>

          <form className='h-mt-32' onSubmit={handleSubmit(onSubmit)}>
            <div className='-bottom-line'>
              <div className='b-header '>
                <TextField
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      asterisk: "labelAsterisk",
                    },
                  }}
                  id="title"
                  label="Tiêu đề"
                  size='small'
                  name="title"
                  autoFocus
                  className='p-title'
                  required
                  inputRef={register({
                    minLength: 5,
                    maxLength: 50
                  })}
                />

                <Typography className='p-validate-error h-mt-4'>
                  {errors.title &&
                    'Tiêu đề phải có 5-50 ký tự. Có thể sử dụng chữ và số và các ký tự đặc biệt'
                  }
                </Typography>

                <div className='b-dataset-url h-mt-32 -align-center'>
                  <IconButton className='h-mr-24' onClick={handleCopyLink}>
                    <Link />
                  </IconButton>

                  <Typography>
                    {`${process.env.REACT_APP_FRONT_END_URL}dataset/${user.username}/`}
                  </Typography>

                  <TextField
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                      classes: {
                        asterisk: "labelAsterisk",
                      },
                    }}
                    id="url"
                    fullWidth
                    label='URL'
                    size='small'
                    name="url"
                    required
                    inputRef={register({
                      pattern: /^(?=.{5,}$)(?![-])(?!.*[-]{2})[a-zA-Z0-9-]+(?<![-])$/
                    })}
                  />

                  <Typography className='p-validate-error h-mt-2'>
                    {errors.url && 'Url có ít nhất 5 ký tự. Có thể sử dụng chữ, số và dấu gạch ngang'}
                  </Typography>
                </div>
              </div>

              <div className='h-mt-32 '>
                <Typography className='f-weight-700 h-mb-10'>Mô tả dataset</Typography>

                <TinyMCEEditor
                  values={description}
                  setValues={setDescription}
                  height={250}
                />
              </div>

              <div className='h-mt-32'>
                <Typography className='f-weight-700 h-mb-10'>Tải lên files</Typography>
                <DatasetUpload control={control} setCreatable={setCreatable} creatable={creatable} />
              </div>
            </div>

            <DatasetSelectVisibility control={control} />

            <div className='-top-line'>
              <Typography ref={apiResult} className='resultAPI h-mt-10 h-ml-2' />

              <Button
                className=' p-button-save-color p-round-button'
                type='submit'
                disabled={!creatable}
                variant='outlined'>
                Tạo dataset
              </Button>
            </div>
          </form>
        </div>

        <Footer />

      </Container>
    </>
  )
}

