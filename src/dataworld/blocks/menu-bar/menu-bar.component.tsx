import {
  AppBar,
  Avatar,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'store';
import AuthenticationAPI from "api/authentication-api";
import { logoutSuccess } from 'redux/authentication-slice';
import './menu-bar.scss';

export default function MenuBar() {
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
    setAnchorEl(event ? event.currentTarget : null);
  };

  const handleGotoProfile = () => {
    handleMenu(null);
    history.push(`/profile/${user.username}`);
  };

  const handleLogout = async () => {
    await AuthenticationAPI.logout()
    dispatch(logoutSuccess());
    handleMenu(null);
    history.push('/auth/login')
  };

  const handleChangePassword = () => {
    setAnchorEl(null);
    history.push('/auth/reset-password/code');
  };

  return (
    <>
      {user.accountId !== '' && (
        <AppBar position='fixed' className='t-app-bar'>
          <Toolbar className='b-tool-bar'>
            <div>
              <Link href='/home' className='p-redirect-page' color='inherit'>Data World</Link>
              <Link href='/dataset' className='h-ml-24 p-redirect-page' color='inherit'>Dataset</Link>
            </div>

            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={(event) => handleMenu(event)}
              color='default'
            >
              <Avatar src={user.avatar} />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={() => handleMenu(null)}
            >
              <MenuItem onClick={handleGotoProfile}>Tài khoản</MenuItem>
              <MenuItem onClick={handleChangePassword}>Đổi mật khẩu</MenuItem>
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}
