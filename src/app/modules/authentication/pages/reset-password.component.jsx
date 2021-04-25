import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import addToast from 'dataworld/parts/toast/add-toast.component';
import AuthenticationAPI from 'api/authentication-api';
import { STATUS_OK } from 'services/axios/common-services.const';
import Copyright from 'dataworld/parts/copy-right/copy-right.component';
import ResetPasswordForm from '../components/reset-password/reset-password-form.component';
import { StyledPaper } from '../../../../styles/jss/custom.component';

export default function ResetPasswordPage() {
  const { resetCode } = useParams();
  const [isValidToken, setValidToken] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const validateResetCode = async () => {
      const result = await AuthenticationAPI.resetPassword(resetCode);
      if (result.status === STATUS_OK) {
        setValidToken(true);
      } else {
        addToast({ message: 'Link không đúng', type: 'error' });
        history.push('/auth/login');
      }
    };
    validateResetCode();
  }, [history, resetCode]);

  return (
    <>
      {isValidToken && (
        <Container component='main' maxWidth='xs' className='h-mt-100'>
          <CssBaseline />
          <StyledPaper variant='outlined'>
            <Avatar
              className='avatar'
              src={process.env.PUBLIC_URL + '/images/reset-password'}
            ></Avatar>
            <Typography component='h1' variant='h5'>
              Đổi mật khẩu
            </Typography>
            <ResetPasswordForm resetCode={resetCode} />
            <Grid container justify='flex-end'>
              <Grid item>
                Bạn đã có tài khoản?{' '}
                <Link href='/auth/login' variant='body2'>
                  Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </StyledPaper>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )}
    </>
  );
}
