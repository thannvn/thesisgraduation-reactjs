import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import {
  BusinessRounded,
  CakeOutlined,
  Close, GitHub,
  LanguageOutlined,
  LocationOnOutlined,
  PersonOutline,
  PhotoCamera
} from '@material-ui/icons';
import ProfileAPI from 'api/profile-api';
import { STATUS_OK } from 'services/axios/common-services.const';
import 'app/modules/profile/css/profile-info.scss';
import CropImage from 'dataworld/blocks/crop-image/crop-image.component';
import DateTimePicker from 'dataworld/parts/datetime-picker/date-time-picker.component';
import addToast from 'dataworld/parts/toast/add-toast.component';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from 'redux/authentication-slice';
import { RootState } from 'store';
import { ProfileProps } from 'app/modules/profile/pages/profile.template';


export default function ProfileInfo({ self }: ProfileProps) {
  const { state, handleChangeEditMode, handleSaveEdit, handleCancelEdit, defaultValues } = self
  const [loadingImage, setLoadingImage] = useState<boolean>(false)
  const { handleSubmit, register, control, setValue, reset } = useForm({ defaultValues })
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState<string>('')
  const [cropAvatar, setCropAvatar] = useState<Cropper>()
  const [avatarDialog, setAvatarDialog] = useState<boolean>(false)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const openFileSelect = () => {
    if (inputFileRef.current !== null) {
      inputFileRef.current.click()
    }
  }

  const closeAvatarDialog = () => {
    setAvatar('')
    setAvatarDialog(false)
  }

  const onFilechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /*Selected files data can be collected here.*/
    event.preventDefault()
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => {
        setAvatar(reader.result as any)
      }

    }
    event.target.value = ''
    setAvatarDialog(true)
  }

  const uploadAvatar = () => {
    if (cropAvatar) {
      cropAvatar.getCroppedCanvas().toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData()
          formData.append('username', user.username)
          formData.append('imageType', 'profile')
          formData.append('image', blob, 'avatar.png')
          setLoadingImage(true)
          const result = await ProfileAPI.updateAvatar(formData)
          if (result.status === STATUS_OK) {
            addToast({ message: result.message, type: "success" })
            const updateUser = { ...user }
            updateUser.avatar = result.data
            dispatch(loginSuccess(updateUser))
            closeAvatarDialog()
          }
          setLoadingImage(false)
        }
      })
    }
  }

  useEffect(() => {
    if (!state.isLoading) {
      reset(defaultValues)
    }
  }, [state.isLoading, reset, defaultValues])

  return (
    <Paper className='b-profile-info h-mr-10'>
      <form className='b-profile' onSubmit={handleSubmit(handleSaveEdit)}>
        <div className='p-avatar'>
          <Avatar src={user.avatar} />

          <input
            style={{ display: 'none' }}
            ref={inputFileRef}
            type='file'
            onChange={onFilechange}
            accept="image/*"
          />

          <Tooltip title='Cập nhật ảnh đại diện'>
            <IconButton className='p-edit' onClick={openFileSelect}>
              <PhotoCamera color='inherit' fontSize='large' />
            </IconButton>
          </Tooltip>

        </div>

        <Dialog open={avatarDialog} className='p-crop-avatar-dialog'>
          <DialogTitle id="change-avatar-title" style={{ borderBottom: '1px solid rgb(200, 200, 200)' }}>
            <IconButton
              onClick={closeAvatarDialog}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px'
              }}>
              <Close />
            </IconButton>
             Cập nhật ảnh đại diện
          </DialogTitle>

          <DialogContent>
            <CropImage src={avatar} setCropper={setCropAvatar} />
          </DialogContent>

          <DialogActions style={{ borderTop: '1px solid rgb(200, 200, 200)' }}>
            <Button
              variant='contained'
              className='p-round-button p-button-save-color'
              type="submit"
              onClick={uploadAvatar}
              size='small'>
              Tải lên
            </Button>
          </DialogActions>
        </Dialog>

        <Typography className='p-name h-mt-32' >{state.userInfo.name}</Typography>

        <Typography className='p-username'>@{state.userInfo.username}</Typography>

        <Typography className='h-mt-20'>{state.userInfo.bio}</Typography>

        {user.username === state.userInfo.username && !state.isEdit &&
          <button
            type='button'
            className='p-button-edit h-mt-20'
            onClick={handleChangeEditMode}>
            Chỉnh sửa
          </button>
        }

        <div>
          {state.isEdit &&
            <TextareaAutosize
              placeholder='Thêm tiểu sử'
              ref={register}
              name='bio'
              rowsMin={5}
              className='p-text-area-bio h-mt-20 h-ml-4'
            />
          }
        </div>

        <div className='p-icon-text-input'>
          {state.isEdit &&
            <>
              <CakeOutlined className='p-icon' />

              <DateTimePicker
                setDateTime={setValue}
                currentDateTime={state.userInfo.dateOfBirth}
                name='dateOfBirth'
                control={control}
                className='h-ml-12 h-mt-0 h-mb-0 date-time-picker' />
            </>
          }

          {!state.isEdit && state.userInfo.dateOfBirth &&
            <>
              <CakeOutlined className='p-icon' />
              <Typography className='h-ml-8'>{state.userInfo.dateOfBirth}</Typography>
            </>
          }
        </div>

        {state.isEdit &&
          <div className='p-icon-text-input'>
            <PersonOutline className='p-icon' />
            <TextField
              name='name'
              variant='outlined'
              fullWidth
              inputRef={register}
              size='small'
              className='h-ml-8' />
          </div>
        }

        {state.isEdit &&
          <div className='p-icon-text-input'>
            <BusinessRounded className='p-icon' />
            <TextField
              name='company'
              variant='outlined'
              fullWidth
              inputRef={register}
              size='small'
              className='h-ml-8' />
          </div>
        }

        {!state.isEdit && state.userInfo.company &&
          <div className='p-icon-text-input'>
            <BusinessRounded className='p-icon' />
            <Typography className='h-ml-8'>{state.userInfo.company}</Typography>
          </div>
        }

        {state.isEdit &&
          <div className='p-icon-text-input'>
            <LocationOnOutlined className='p-icon' />
            <TextField
              name='location'
              variant='outlined'
              fullWidth
              inputRef={register}
              size='small'
              className='h-ml-8' />
          </div>
        }

        {!state.isEdit && state.userInfo.location &&
          <div className='p-icon-text-input'>
            <LocationOnOutlined className='p-icon' />
            <Typography className='h-ml-8'>{state.userInfo.location}</Typography>
          </div>
        }

        {state.isEdit &&
          <div className='p-icon-text-input'>
            <LanguageOutlined className='p-icon' />
            <TextField
              name='website'
              variant='outlined'
              fullWidth
              inputRef={register}
              size='small'
              className='h-ml-8' />
          </div>
        }

        {!state.isEdit && state.userInfo.website &&
          <div className='p-icon-text-input'>
            <LanguageOutlined className='p-icon' />
            <Typography className='h-ml-8'>{state.userInfo.website}</Typography>
          </div>
        }

        {state.isEdit &&
          <div className='p-icon-text-input'>
            <GitHub className='p-icon' />
            <TextField
              name='github'
              variant='outlined'
              fullWidth
              inputRef={register}
              size='small'
              className='h-ml-8' />
          </div>
        }

        {!state.isEdit && state.userInfo.github &&
          <div className='p-icon-text-input'>
            <GitHub className='p-icon' />
            <Typography className='h-ml-8'>{state.userInfo.github}</Typography>
          </div>
        }

        {state.isEdit &&
          <div className='h-mt-20'>
            <button
              className='p-button-edit p-btn-save'
              type='submit'>
              Lưu
            </button>
            <button
              className='p-button-edit h-ml-6 p-btn-cancel'
              type='button'
              onClick={handleCancelEdit}>
              Hủy
            </button>
          </div>
        }
      </form>
    </Paper>

  )
}