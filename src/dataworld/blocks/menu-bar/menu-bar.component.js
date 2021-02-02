import {
  AppBar,
  Avatar,
  Button, IconButton, Menu,
  MenuItem, Toolbar
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../../../redux/authentication';
import './menu-bar.scss';

export default function MenuBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    handleClose()
    localStorage.removeItem('auth-token');
  };
  return (
    <>
      {user.user && (
          <AppBar position='fixed' color='inherit' >
            <Toolbar className='t-menu-bar'>
              <Button className='title'>
                <a href='/home'>Data world</a>
              </Button>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='default'
                className='avatar'
              >
                <Avatar src={user.user.avatar} />
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
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
      )}
    </>
  );
}
