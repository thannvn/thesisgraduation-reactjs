import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import {
  Add, AddBox,
  ExpandMore, History,
  InsertDriveFileOutlined,
  Delete,
} from '@material-ui/icons';
import DatasetAPI, { Version } from 'api/dataset-api';
import { FileInfo } from 'api/file-api';
import DatasetUpload from 'app/modules/dataset/_common/dataset-upload/dataset-upload.component';
import 'app/modules/dataset/dataset-view/css/history-tab.scss';
import { DatasetViewContext } from 'app/modules/dataset/dataset-view/pages/context.component';
import clsx from 'clsx';
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface HistoryTabProps {
  index: number,
  value: number,
}

interface FormValues {
  version: string,
  files: Array<any>,
}

export default function HistoryTab(props: HistoryTabProps) {
  const { index, value } = props
  const [currentVersion, setCurrentVersion] = useState<Version | null>(null)
  const { datasetValues, files } = useContext(DatasetViewContext)
  const [updatable, setUpdatable] = useState<boolean>(false)
  const [previousFiles, setPreviousFiles] = useState<Array<FileInfo>>([])
  const lengthVersions = datasetValues.dataset.versions.length

  const defaultValues = {
    version: '',
    files: [],
  }

  const { register, control, errors, handleSubmit } = useForm<FormValues>({ defaultValues })

  const addVersion = () => {
    setCurrentVersion(null)
  }

  const handleDeleteFile = (deleteIndex: number) => {
    setPreviousFiles((prev) => (
      prev.filter((file, index) => index !== deleteIndex)
    ))
  }

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData()
    formData.append('datasetId', datasetValues.dataset._id)
    formData.append('version', data.version)
    formData.append('username', datasetValues.username)
    formData.append('url', datasetValues.dataset.url)
    formData.append('previousFiles', JSON.stringify(previousFiles))
    data.files.forEach((file: any) =>
      formData.append('files', file.file)
    )
    const result = await DatasetAPI.createNewVersion(formData)
    console.log(result)
  }

  useEffect(() => {
    if (datasetValues.dataset.versions.length > 0) {
      setCurrentVersion(datasetValues.dataset.versions[0])
      setPreviousFiles(files)
    }
  }, [datasetValues.dataset.versions, files])

  return (
    <div
      hidden={index !== value}
      className="t-history-tab h-mt-32"
    >
      {console.log(currentVersion)}
      <div className='p-title'>
        <Typography variant='h6' className='h-ml-20'>Lịch sử sửa đổi</Typography>
      </div>
      <Grid container spacing={0} className='b-history'>
        <Grid item xs={3} className='b-options'>
          <div className='p-version'>
            {datasetValues.dataset.versions.map((version, index) => (
              <div className='h-mt-10' key={index}>
                <button
                  className={clsx({ 'p-option-current': version.version === currentVersion?.version },
                    { 'p-button-span h-ml-4 p-option-name': true })}
                  onClick={() => setCurrentVersion(version)}
                >
                  {version.version}
                </button>
              </div>
            ))}
          </div>

          <div className='h-mt-32 p-new-version'>
            <Button
              className='p-round-button'
              variant='contained'
              color='primary'
              onClick={addVersion}
              startIcon={<Add />}
            >
              Tạo mới
            </Button>
          </div>
        </Grid>

        <Grid item xs={9}>
          {currentVersion === null ?
            <div className='b-add-new-version'>
              <div className='-bottom-line'>
                <Typography variant='h6' className='f-weight-700'>Tạo phiên bản mới</Typography>
                <Typography variant='body1' className='p-gray-color-typography -italic-style h-mb-24'>
                  Để cập nhật nội dung, hãy tải lên file có tên giống với file hiện tại
              </Typography>
              </div>

              <form className='h-mt-32' onSubmit={handleSubmit(onSubmit)} >
                <TextField
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    classes: {
                      asterisk: "labelAsterisk",
                    },
                  }}
                  id="version"
                  label="Tên phiên bản"
                  size='small'
                  name="version"
                  style={{ width: '75%' }}
                  autoFocus
                  className='p-version'
                  required
                  inputRef={register({
                    minLength: 5,
                    maxLength: 50
                  })}
                />

                <Typography className='p-validate-error h-mt-4'>
                  {errors.version &&
                    'Tên phiên bản phải có 5-50 ký tự. Có thể sử dụng chữ và số và các ký tự đặc biệt'
                  }
                </Typography>

                <Typography
                  variant='body2'
                  className='h-mt-4 p-gray-color-typography '
                >
                  {window.location.href}
                </Typography>

                <div className='-top-line h-mt-20'>
                  <Typography className='h-mt-20 f-weight-700'>
                    Phiên bản trước ({lengthVersions > 0
                      && datasetValues.dataset.versions[0].version})
                  </Typography>

                  <ul className='b-list h-mt-10'>
                    {previousFiles.map((file, index) =>
                      <li className='h-d_flex -justify-space-between h-mt-6' key={index}>
                        <div className='h-d_flex'>
                          <InsertDriveFileOutlined />
                          <Typography className='h-ml-10'>{file.name} ({file.size})</Typography>
                        </div>

                        <IconButton onClick={() => handleDeleteFile(index)}>
                          <Delete />
                        </IconButton>
                      </li>)
                    }
                  </ul>

                  <Typography className='h-mt-20 f-weight-700 h-mb-10'>
                    Tải lên files
                  </Typography>

                  <DatasetUpload
                    control={control}
                    setCreatable={setUpdatable}
                    creatable={updatable}
                  />
                </div>

                <div className='-top-line'>
                  <Button
                    className='p-button-save-color p-round-button h-mt-20'
                    type='submit'
                    disabled={!updatable}
                    variant='outlined'>
                    Cập nhật
                  </Button>
                </div>

              </form>

            </div>

            :

            <div className='b-version-info'>
              <div className='h-d_flex p-header-version'>
                <History />
                <Typography className='f-weight-700 h-ml-10'>{currentVersion?.version}</Typography>
                <Typography className='p-gray-color-typography h-ml-32'>
                  Cập nhật {moment(currentVersion?.createdDate).fromNow()}
                </Typography>
              </div>

              <div
                className='p-change'
              >
                <Accordion>
                  <AccordionSummary
                    className='p-summary-custom'
                    expandIcon={<ExpandMore />}
                  >
                    <Typography>Có {currentVersion?.fileChanges.length} files thay đổi</Typography>

                    <Typography className='h-ml-32'>
                      <span style={{ color: '#4caf50' }}>101 thêm</span>
                      <span style={{ color: 'red' }} className='h-ml-10'>54 delete</span>
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <ul className='b-list'>
                      <li className='h-d_flex -justify-space-between p-item'>
                        <div className='h-d_flex'>
                          <AddBox style={{ color: '#4caf50' }} />
                          <Typography className='h-ml-10'>Item 1</Typography>
                        </div>

                        <div className='h-d_flex'>
                          <span style={{ color: '#4caf50' }}>+101</span>
                          <span style={{ color: 'red' }} className='h-ml-10'>-54</span>
                        </div>
                      </li>

                      <li className='h-d_flex -justify-space-between p-item'>
                        <div className='h-d_flex'>
                          <AddBox style={{ color: '#4caf50' }} />
                          <Typography className='h-ml-10'>Item 2</Typography>
                        </div>

                        <div className='h-d_flex'>
                          <span style={{ color: '#4caf50' }}>+101</span>
                          <span style={{ color: 'red' }} className='h-ml-10'>-54</span>
                        </div>
                      </li>
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          }
        </Grid>
      </Grid>
    </div>

  )
}