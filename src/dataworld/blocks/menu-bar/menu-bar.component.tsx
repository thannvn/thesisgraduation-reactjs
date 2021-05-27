import {
  AppBar,
  Avatar,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from '@material-ui/core';
import {
  AccountCircleOutlined,
  ExitToApp, AddCircleOutline,
  SettingsOutlined, StorefrontRounded
} from '@material-ui/icons';
import AuthenticationAPI from "api/authentication-api";
import SearchField from 'dataworld/parts/search-field/search-field.component';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutSuccess } from 'redux/authentication-slice';
import { useAppDispatch } from 'redux/hooks';
import { RootState } from 'store';
import './menu-bar.scss';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: any) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

export default function MenuBar() {
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [popoverId, setPopoverId] = React.useState<number>(0)
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, id: number) => {
    setPopoverId(id)
    setAnchorEl(event ? event.currentTarget : null);
  };

  const handleGotoProfile = (tabIndex?: number) => {
    handleMenu(null, 0);
    history.push({
      pathname: `/profile/${user.username}`,
      state: {
        tabIndex: tabIndex
      }
    });
  };

  const handleLogout = async () => {
    await AuthenticationAPI.logout()
    dispatch(logoutSuccess());
    handleMenu(null, 0);
  };

  const isOpenModal = (id: number) => {
    return Boolean(id === popoverId) && Boolean(anchorEl)
  }

  const handleGotoCreateDataset = () => {
    history.push('/dataset/create')
  }

  return (
    <>
      {user.accountId !== '' && (
        <AppBar position='fixed' className='t-app-bar'>
          <Toolbar className='b-tool-bar'>
            <div className='h-d_flex p-header-search'>
              <Link href='/dataset' className='p-redirect-page' color='inherit'>Data World</Link>

              <SearchField
                className='p-search-field h-ml-20'
                placeHolder='Tìm kiếm...'
                onChange={() => { }}
              />
            </div>

            <div className='h-d_flex'>
              <Tooltip title='Kho lưu trữ' className='h-mr-16'>
                <IconButton
                  color='inherit'
                  onClick={() => handleGotoProfile(1)}
                >
                  <StorefrontRounded fontSize='default' />
                </IconButton>
              </Tooltip>

              <Tooltip className='h-mr-16' title='Tạo dataset'>
                <IconButton
                  color='inherit'
                  className='h-mr-16'
                  onClick={handleGotoCreateDataset}
                >
                  <AddCircleOutline fontSize='default' />
                </IconButton>
              </Tooltip>

              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={(event) => handleMenu(event, 1)}
              >
                <Avatar src={user.avatar} />
              </IconButton>
            </div>

            <StyledMenu
              id='menu-appbar'
              className='h-mt-38'
              disableScrollLock
              anchorEl={anchorEl}
              keepMounted
              open={isOpenModal(1)}
              onClose={() => handleMenu(null, 1)}
            >
              <MenuItem
                onClick={() => handleGotoProfile(0)}
                style={{ borderBottom: '1px solid #dedfe0' }}
              >
                <div >
                  <Typography className='f-weight-700'>{user.name}</Typography>
                  <Typography className='p-gray-color-typography' variant='body2'>@{user.username}</Typography>
                </div>
              </MenuItem>

              <MenuItem onClick={() => handleGotoProfile(0)}>
                <AccountCircleOutlined className='h-mr-10' />
                Hồ sơ cá nhân
              </MenuItem>

              <MenuItem onClick={() => handleGotoProfile(2)}>
                <SettingsOutlined className='h-mr-10' />
                Cài đặt tài khoản
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                <ExitToApp className='h-mr-10' />
                Đăng xuất
              </MenuItem>
            </StyledMenu>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}
