import { Avatar, Paper, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import React from 'react'
import {
    BusinessRounded,
    LocationOnOutlined,
    LanguageOutlined,
    CakeOutlined,
    GitHub
} from '@material-ui/icons';
import '../css/profile-info.scss'
import { ProfileProps } from '../pages/profile.template'

export default function ProfileInfo({ self }: ProfileProps) {
    const { state, handleChangeEditMode, handleSaveEdit, handleCancelEdit } = self

    return (
        <Paper className='paper b-profile-info'>
            <div className='p-avatar'>
                <Avatar />
            </div>

            <Typography className='p-name' >Thann</Typography>

            <Typography>username</Typography>

            <Typography>Bio</Typography>

            {!state.isEdit &&
                <button
                    className='p-button-edit'
                    onClick={handleChangeEditMode}>
                    Chỉnh sửa
                </button>
            }


            {state.isEdit &&
                <TextareaAutosize
                    placeholder='Add a bio'
                    rowsMin={5}
                    className='p-text-area-bio'
                />
            }

            <div className='p-icon-text-input'>
                <CakeOutlined className='p-icon' />
                {state.isEdit ?
                    <TextField
                        name='dateOfBirth'
                        variant='outlined'
                        fullWidth
                        size='small'
                        className='h-ml-5' />
                    :
                    <Typography className='h-ml-5'>Ngày sinh</Typography>
                }

            </div>

            <div className='p-icon-text-input'>
                <BusinessRounded className='p-icon' />
                {state.isEdit ?
                    <TextField
                        name='company'
                        variant='outlined'
                        fullWidth
                        size='small'
                        className='h-ml-5' />
                    :
                    <Typography className='h-ml-5'>Company</Typography>
                }

            </div>

            <div className='p-icon-text-input'>
                <LocationOnOutlined className='p-icon' />
                {state.isEdit ?
                    <TextField
                        name='location'
                        variant='outlined'
                        fullWidth
                        size='small'
                        className='h-ml-5' />
                    :
                    <Typography className='h-ml-5'>Location</Typography>
                }

            </div>

            <div className='p-icon-text-input'>
                <LanguageOutlined className='p-icon' />
                {state.isEdit ?
                    <TextField
                        name='website'
                        variant='outlined'
                        fullWidth
                        size='small'
                        className='h-ml-5' />
                    :
                    <Typography className='h-ml-5'>Website</Typography>
                }

            </div>

            <div className='p-icon-text-input'>
                <GitHub className='p-icon' />
                {state.isEdit ?
                    <TextField
                        name='github'
                        variant='outlined'
                        fullWidth
                        size='small'
                        className='h-ml-5' />
                    :
                    <Typography className='h-ml-5'>Website</Typography>
                }

            </div>

            {state.isEdit &&
                <div className='h-mt-20'>
                    <button className='p-button-edit p-btn-save' onClick={handleSaveEdit}>
                        Lưu
                    </button>
                    <button className='p-button-edit h-ml-5 p-btn-cancel' onClick={handleCancelEdit}>
                        Hủy
                    </button>
                </div>
            }

        </Paper>
    )
}