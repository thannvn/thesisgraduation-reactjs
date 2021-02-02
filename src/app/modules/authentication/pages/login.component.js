import {
  Avatar,
  Box,
  Container,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Copyright from '../../../../dataworld/parts/copy-right/copy-right.component';
import LoginFacebook from '../components/login-facebook.component';
import LoginForm from '../components/login-form.component';
import LoginGoogle from '../components/login-google.component';
import { StyledPaper } from '../css/custom.component';

export default function LoginPage(props) {
  const user = useSelector((state) => state.auth);
  return (
    <>
      {user.user !== null && <Redirect to='/home' />}
      <Container component='main' className='main'>
        <StyledPaper variant='outlined'>
          <Avatar className='avatar'>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component='h1' variant='h5'>
            Đăng nhập
          </Typography>

          <LoginForm />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <LoginGoogle />
            </Grid>
            <Grid item xs={12} sm={6}>  
              <LoginFacebook />
            </Grid>
            <Grid item xs >
              <Link href='/auth/forgot' variant='body2'>
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              Bạn chưa có tài khoản?{' '}
              <Link href='/auth/register' variant='body2'>
                Đăng ký
              </Link>
            </Grid>
          </Grid>
        </StyledPaper>

        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
