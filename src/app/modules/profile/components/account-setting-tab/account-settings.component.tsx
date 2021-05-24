import { Button, Tooltip, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import {
  Block, DeleteForeverOutlined,
  VpnLockOutlined, Public
} from '@material-ui/icons';
import { ProfileProps } from 'app/modules/profile/pages/profile.template'
import 'app/modules/profile/css/account-settings-tab.scss'
import ConfirmDialog from 'dataworld/blocks/confirm-dialog/confirm-dialog.component';
import { useHistory } from 'react-router';
import ProfileAPI from 'api/profile-api';
import { STATUS_OK } from 'services/axios/common-services.const';
import addToast from 'dataworld/parts/toast/add-toast.component';
import AuthenticationAPI from 'api/authentication-api';
import { useAppDispatch } from 'redux/hooks';
import { logoutSuccess } from 'redux/authentication-slice';
import moment from 'moment'
import 'moment/locale/vi'
import { AccountMode } from 'app/modules/dataset/_common/common.const';


interface AccountSettingsProps extends ProfileProps {
  index: number,
  value: number,
}

export default function AccountSettings({ index, value, self }: AccountSettingsProps) {
  const { state, setAccountMode } = self
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)
  const [changeAccountMode, setChangeAccountMode] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const accountMode = state.userInfo.accountMode === AccountMode.PRIVATE_ACCOUNT
  const accountModeTitle = accountMode ?
    'Chuyển sang tài khoản công khai' :
    'Chuyển sang tài khoản cá nhân'

  const accountModeContent = accountMode ?
    'Ở chế độ công khai mọi người có thể xem được thông tin cá nhân của bạn. Bạn có muốn tiếp tục?' :
    'Ở chế độ cá nhân, thông tin của bạn sẽ được ẩn với người khác. Bạn có muốn tiếp tục?'

  const history = useHistory()

  const handleDeleteConfirm = (isOpen: boolean) => {
    setDeleteConfirm(isOpen)
  }

  const deleteAccount = async () => {
    const result = await ProfileAPI.deleteAccount()
    if (result.status === STATUS_OK) {
      addToast({ message: result.message, type: 'success' })
      await AuthenticationAPI.logout()
      dispatch(logoutSuccess());
    }
  }

  const handleChangePassword = () => {
    history.push('/auth/reset-password/reset-code');
  }

  const handleChangeAccountMode = (isOpen: boolean) => {
    setChangeAccountMode(isOpen)
  }

  const acceptChangeAccountMode = async () => {
    const mode = accountMode ? 1 : 0
    const result = await ProfileAPI.updateAccountMode(mode)
    if (result.status === STATUS_OK) {
      setAccountMode(mode)
      addToast({ message: result.message, type: 'success' })
    }
  }

  return (
    <div hidden={index !== value} className='b-account-settings'>
      <div className='b-setting-item'>
        <Typography className='f-weight-700' variant='h6'>Tài khoản</Typography>

        <div className='-top-line h-mt-4'>
          <div className='h-d_flex -align-center h-mt-16'>
            <Typography>Tên tài khoản:</Typography>

            <Typography variant='body2' className='p-gray-color-typography h-ml-4 h-mr-4'>
              @{state.userInfo.username}
            </Typography>

            <Tooltip title='Tên tài khoản không thể chỉnh sửa' arrow >
              <Block fontSize='small' color='action' />
            </Tooltip>
          </div>

          <div className='h-d_flex -align-center h-mt-6'>
            <Typography>Tham gia:</Typography>

            <Typography variant='body2' className='p-gray-color-typography h-ml-4 h-mr-4'>
              {moment(state.userInfo.createdDate).locale('vi').format('MMMM-Do-YYYY')}
            </Typography>
          </div>

          <div className=''>
            <Button
              className='p-round-button h-mt-10'
              startIcon={accountMode ? <Public /> : <VpnLockOutlined />}
              variant='outlined'
              onClick={() => handleChangeAccountMode(true)}
              color='primary'
            >
              {accountMode ? 'Tài khoản công khai' : 'Tài khoản cá nhân'}
            </Button>

            <ConfirmDialog
              open={changeAccountMode}
              onClose={() => handleChangeAccountMode(false)}
              onAccept={acceptChangeAccountMode}
              acceptTheme='primary'
              title={accountModeTitle}
              content={accountModeContent}
            />
          </div>
        </div>
      </div>

      <div className='b-setting-item'>
        <Typography className='f-weight-700' variant='h6'>Mật khẩu</Typography>

        <div className='-top-line h-mt-4'>
          <Button
            className='p-round-button h-mt-16'
            variant='outlined'
            color='primary'
            onClick={handleChangePassword}
          >
            Đổi mật khẩu
          </Button>
        </div>
      </div>

      <div className='b-setting-item'>
        <Typography
          className='f-weight-700'
          variant='h6'
          style={{ color: '#f50057' }}
        >
          Xóa tài khoản
        </Typography>

        <div className='-top-line h-mt-4'>
          <Button
            className='p-round-button h-mt-16'
            color='secondary'
            variant='outlined'
            startIcon={<DeleteForeverOutlined />}
            onClick={() => handleDeleteConfirm(true)}
            type="button"
          >
            Xóa tài khoản
          </Button>

          <ConfirmDialog
            open={deleteConfirm}
            onClose={() => handleDeleteConfirm(false)}
            onAccept={deleteAccount}
            acceptTheme='secondary'
            dialogTheme='warning'
            title='Xóa tài khoản'
            content='Toàn bộ dữ liệu của tài khoản và dataset liên quan sẽ bị xóa. 
            Bạn có muốn tiếp tục?'
          />
        </div>
      </div>
    </div>
  )
}