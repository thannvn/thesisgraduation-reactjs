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
  SettingsOutlined
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
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
    setAnchorEl(event ? event.currentTarget : null);
  };

  const handleGotoProfile = () => {
    handleMenu(null);
    history.push({
      pathname: `/profile/${user.username}`,
    });
  };

  const handleLogout = async () => {
    await AuthenticationAPI.logout()
    dispatch(logoutSuccess());
    handleMenu(null);
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

            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={(event) => handleMenu(event)}
            >
              <Avatar src={user.avatar} />
            </IconButton>
            <StyledMenu
              id='menu-appbar'
              className='h-mt-38'
              disableScrollLock
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={() => handleMenu(null)}
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
