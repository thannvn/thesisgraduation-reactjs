import { Button, Grid, IconButton, TextField, Typography } from '@material-ui/core'
import { AddAPhoto, Delete } from '@material-ui/icons'
import DatasetAPI from 'api/dataset-api'
import { STATUS_OK } from 'services/axios/common-services.const'
import 'app/modules/dataset/dataset-view/css/settings-tab.scss'
import clsx from 'clsx'
import "cropperjs/dist/cropper.css"
import AlertDialog from 'dataworld/blocks/alert-dialog/alert-dialog.component'
import CropImage from 'dataworld/blocks/crop-image/crop-image.component'
import addToast from 'dataworld/parts/toast/add-toast.component'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DatasetViewContext } from 'app/modules/dataset/dataset-view/pages/context.component'
import { IMAGE_TYPE } from 'app/modules/dataset/_common/common.const'

interface SettingsTabsProps {
  index: number,
  value: number,
}

const options = [
  { title: 'Tổng quát' },
  { title: 'Ảnh nền' },
  { title: 'Thumbnail' },
]
interface DefaultValuesForm {
  title: string,
  subtitle: string,
}


export default function SettingsTab(props: SettingsTabsProps) {
  const { index, value } = props
  const { datasetValues, setTitleAndSubtitle, setThumbnailDataset, setBannerDataset } = useContext(DatasetViewContext)

  const [banner, setBanner] = useState<any>('')
  const [thumbnail, setThumbnail] = useState<any>('')
  const [cropperThumbnail, setCropperThumbnail] = useState<Cropper>()
  const [cropperBanner, setCropperBanner] = useState<Cropper>();
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
  const [currentOption, setCurrentOption] = useState<string>(options[0].title)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const changeDefaultValues = useMemo(() => {
    const defaultValues: DefaultValuesForm = {
      title: datasetValues.dataset.title,
      subtitle: datasetValues.dataset.subtitle
    }
    return defaultValues
  }, [datasetValues.dataset.title, datasetValues.dataset.subtitle])
  const { register, handleSubmit, errors, watch, reset } = useForm({ defaultValues: changeDefaultValues })


  const onSubmit = async (data: DefaultValuesForm) => {
    const result = await DatasetAPI.updateTitleAndSubtitle(datasetValues.dataset._id, data.title, data.subtitle)
    if (result.status === STATUS_OK) {
      addToast({ message: result.message, type: "success" })
      setTitleAndSubtitle(data.title, data.subtitle)
    } else {
      addToast({ message: result.message, type: "error" })
    }
  }

  const openDeleteConfirm = () => {
    setDeleteConfirm(true)
  }

  const closeDeleteConfirm = () => {
    setDeleteConfirm(false)
  }

  const acceptDelete = () => {

  }

  const uploadImage = async (imageType: number) => {
    const banner = imageType === IMAGE_TYPE.BANNER

    if (cropperThumbnail) {
      cropperThumbnail.getCroppedCanvas().toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData()
          formData.append('datasetId', datasetValues.dataset._id)
          formData.append('url', datasetValues.dataset.url)
          formData.append('username', datasetValues.username)
          formData.append('imageType', imageType.toString())
          formData.append('image', blob, banner ? 'banner' : 'thumbnail.png')

          const result = await DatasetAPI.uploadImage(formData)

          if (result.status === STATUS_OK) {
            addToast({ message: result.message, type: "success" })
            banner ? setBannerDataset(result.data) : setThumbnailDataset(result.data)
            banner ? setBanner('') : setThumbnail('')
          } else {
            addToast({ message: result.message, type: "error" })
          }
        }
      })
    }
  }

  const onFilechange = (event: React.ChangeEvent<HTMLInputElement>, mode: string) => {
    /*Selected files data can be collected here.*/
    event.preventDefault()
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => {
        mode === 'banner' ? setBanner(reader.result as any) : setThumbnail(reader.result as any)
      }
    }
    event.target.value = ''
  }

  const handleClickInputFile = () => {
    if (inputFileRef.current !== null) {
      inputFileRef.current.click()
    }
  }

  useEffect(() => {
    reset(changeDefaultValues)

  }, [reset, changeDefaultValues])

  return (
    <div
      hidden={index !== value}
      className="t-settings-tab h-mt-32"
    >
      <div className='p-title'>
        <Typography variant='h6' className='h-ml-20'>Cài đặt</Typography>
      </div>

      <Grid container spacing={0} className='b-settings'>
        <Grid item xs={3} className='p-options'>
          {options.map((option, index) => (
            <div className='h-mt-10' key={index}>
              <button
                className={clsx({ 'p-option-current': option.title === currentOption },
                  { 'p-button-span h-ml-4 p-option-name': true })}
                onClick={() => setCurrentOption(option.title)}
              >
                {option.title}
              </button>
            </div>

          ))}
        </Grid>

        <Grid item xs={9}>
          {currentOption === options[0].title &&
            <div className='b-general'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='p-input-field'>
                  <Typography className='h-mr-20 p-gray-color-typography'>Tiêu đề</Typography>
                  <TextField
                    variant='outlined'
                    size='small'
                    name='title'
                    fullWidth
                    required
                    inputRef={register({
                      minLength: 5,
                      maxLength: 50
                    })}
                  />
                </div>
                {errors.title &&
                  <Typography className='h-ml-100 p-validate-error h-mt-4 '>
                    Tiêu đề phải có 5-50 ký tự. Có thể sử dụng chữ và số và các ký tự đặc biệt
                  </Typography>
                }

                <div className='p-input-field h-mt-12'>
                  <Typography className='h-mr-20 p-gray-color-typography'>Subtitle</Typography>
                  <TextField
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='subtitle'
                    required
                    inputRef={register({
                      minLength: 5,
                      maxLength: 80
                    })}
                  />
                </div>

                {errors.subtitle &&
                  <Typography className='h-ml-100 p-validate-error h-mt-4'>
                    Subtitle phải có 5-80 ký tự. Có thể sử dụng chữ và số và các ký tự đặc biệt
                  </Typography>
                }


                <div className='p-action h-mt-32'>
                  <Button
                    className='h-ml-4 p-round-button'
                    color='secondary'
                    startIcon={<Delete />}
                    onClick={openDeleteConfirm}
                    type="button"
                  >
                    Xóa dataset
                  </Button>

                  <AlertDialog
                    open={deleteConfirm}
                    onClose={closeDeleteConfirm}
                    onAccept={acceptDelete}
                    acceptTheme='secondary'
                    title='Xóa dataset'
                    content='Toàn bộ dữ liệu của dataset sẽ bị xóa. Bạn có chắc chắn muốn xóa?'
                  />
                  <Button
                    variant='contained'
                    className='p-round-button p-button-save-color'
                    type="submit"
                    disabled={watch('title') === datasetValues?.dataset.title &&
                      watch('subtitle') === datasetValues?.dataset.subtitle}
                    size='small'>
                    Lưu thay đổi
                  </Button>
                </div>

              </form>
            </div>
          }

          {
            currentOption !== options[0].title &&
            <div className='b-upload-banner-thumbnail'>
              <div>
                <input
                  style={{ display: 'none' }}
                  ref={inputFileRef}
                  type='file'
                  onChange={currentOption === options[1].title ?
                    (event) => onFilechange(event, 'banner') :
                    (event) => onFilechange(event, 'thumbnail')}
                  accept="image/*"
                />

                <div onClick={handleClickInputFile} className='p-button-click'>
                  <IconButton>
                    <AddAPhoto color='primary' />
                  </IconButton>
                  <div>
                    <button className='p-button-span'>
                      {currentOption === options[1].title ? 'Upload ảnh nền' : 'Upload thumbnail'}
                    </button>
                  </div>
                  <Typography className='p-gray-color-typography'>
                    ({currentOption === options[1].title ? '1100x200' : '200x200'})
                  </Typography>
                </div>

                <Button
                  variant='contained'
                  className='p-round-button p-button-save-color h-mt-20'
                  type="submit"
                  disabled={currentOption === options[1].title ? banner === '' : thumbnail === ''}
                  onClick={currentOption === options[1].title ?
                    () => uploadImage(IMAGE_TYPE.BANNER) :
                    () => uploadImage(IMAGE_TYPE.THUMBNAIL)}
                  size='small'>
                  Upload ảnh
                </Button>
              </div>

              {currentOption === options[1].title ?
                <div>
                  {banner === '' ?
                    <img
                      alt='banner'
                      src={datasetValues.dataset.banner}
                      className='p-current-banner-thumbnail'
                    />
                    :
                    <CropImage src={banner} setCropper={setCropperBanner} />
                  }
                </div> :
                <div>
                  {thumbnail === '' ?
                    <img
                      alt='thumbnail'
                      src={datasetValues.dataset.thumbnail}
                      className='p-current-banner-thumbnail'
                    />
                    :
                    <CropImage src={thumbnail} setCropper={setCropperThumbnail} />
                  }
                </div>}
            </div>
          }
        </Grid>
      </Grid>
    </div>

  )
}