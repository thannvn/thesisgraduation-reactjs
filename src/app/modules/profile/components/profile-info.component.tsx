import { Avatar, Paper, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import {
  BusinessRounded,
  CakeOutlined,
  GitHub, LanguageOutlined, LocationOnOutlined
} from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DateTimePicker from '../../../../dataworld/parts/datetime-picker/date-time-picker.component';
import '../css/profile-info.scss';
import { ProfileProps } from '../pages/profile.template';

export default function ProfileInfo({ self }: ProfileProps) {
  const { state, handleChangeEditMode, handleSaveEdit, handleCancelEdit, defaultValues } = self
  const { handleSubmit, register, control, setValue, reset } = useForm({ defaultValues })

  useEffect(() => {
    reset(defaultValues)

  }, [state.userInfo]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Paper className='paper'>
      <form className='b-profile-info' onSubmit={handleSubmit(handleSaveEdit)}>
        <div className='p-avatar'>
          <Avatar src={state.userInfo.avatar} />
        </div>

        <Typography className='p-name h-mt-32' >{state.userInfo.name}</Typography>

        <Typography className='p-username'>{state.userInfo.username}</Typography>

        <Typography className='h-mt-20'>{state.userInfo.bio}</Typography>

        {!state.isEdit &&
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
              placeholder='Add a bio'
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

        <div className='p-icon-text-input'>
          {state.isEdit &&
            <div className='p-icon-text-input'>
              <BusinessRounded className='p-icon' />
              <TextField
                name='company'
                variant='outlined'
                fullWidth
                inputRef={register}
                size='small'
                className='h-ml-8 p-text-input' />
            </div>
          }

          {!state.isEdit && state.userInfo.company &&
            <>
              <BusinessRounded className='p-icon' />
              <Typography className='h-ml-8'>{state.userInfo.company}</Typography>
            </>
          }
        </div>

        {state.isEdit &&
          <div className='p-icon-text-input'>
            <LocationOnOutlined className='p-icon' />
            <TextField
              name='location'
              variant='outlined'
              fullWidth
              inputRef={register}
              size='small'
              className='h-ml-8 p-text-input' />
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
              className='h-ml-8 p-text-input' />
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
              className='h-ml-8 p-text-input' />
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