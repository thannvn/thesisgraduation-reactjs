import {
  AppBar,
  Avatar,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  withStyles
} from '@material-ui/core';
import {
  AccountCircleOutlined,
  ExitToApp,
  MenuRounded, SettingsOutlined, StorefrontRounded
} from '@material-ui/icons';
import AuthenticationAPI from "api/authentication-api";
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

  const handleGotoProfile = () => {
    handleMenu(null, 0);
    history.push({
      pathname: `/profile/${user.username}`,
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

  const handleGotoProfile = () => {
    setAnchorEl(null);
    history.push({
      pathname: `/profile/${user.username}`,
      state: {
        tabIndex: 2
      }
    });
  };

  const handleSettingsAccount = () => {
    setAnchorEl(null);
    history.push({
      pathname: `/profile/${user.username}`,
      state: {
        tabIndex: 2
      }
    });
  };

  return (
    <>
      {user.accountId !== '' && (
        <AppBar position='fixed' className='t-app-bar'>
          <Toolbar className='b-tool-bar'>
            <div>
              <Link href='/dataset' className='p-redirect-page' color='inherit'>Data World</Link>
            </div>

            <div className='h-d_flex'>
              <IconButton
                className='h-mr-20'
                color='inherit'
                onClick={(event) => handleMenu(event, 0)}
              >
                <MenuRounded fontSize='large' />
              </IconButton>

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
              open={isOpenModal(0)}
              onClose={() => handleMenu(null, 0)}
            >
              <MenuItem onClick={handleGotoProfile}>
                <Typography variant='body2' className='h-d_flex -align-center'>
                  <StorefrontRounded />
                  <span className='h-ml-4'>
                    Kho lưu trữ
                  </span>
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleGotoProfile}>
                <Typography variant='body2' className='h-d_flex -align-center'>
                  <StorefrontRounded />
                  <span className='h-ml-4'>
                    Kho lưu trữ
                  </span>
                </Typography>
              </MenuItem>
            </StyledMenu>

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
                onClick={handleGotoProfile}
                style={{ borderBottom: '1px solid #dedfe0' }}
              >
                <div >
                  <Typography className='f-weight-700'>{user.name}</Typography>
                  <Typography className='p-gray-color-typography' variant='body2'>@{user.username}</Typography>
                </div>
              </MenuItem>

              <MenuItem onClick={handleGotoProfile}>
                <AccountCircleOutlined className='h-mr-10' />
                Hồ sơ cá nhân
              </MenuItem>

              <MenuItem onClick={handleSettingsAccount}>
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
