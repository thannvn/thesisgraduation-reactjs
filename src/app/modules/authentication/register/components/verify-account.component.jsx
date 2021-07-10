import { Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import AuthenticationAPI from '../../../../../api/authentication-api';
import { StyledTypography } from '../../../../../styles/jss/custom.component';
import CustomButton from '../../../../../dataworld/parts/button/custom-button.component';
import addToast from '../../../../../dataworld/parts/toast/add-toast.component';

export default function VerifyAccount(props) {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const apiResult = React.useRef(null);

  //submit verify code
  const submitCode = async (data) => {
    const result = await AuthenticationAPI.sendCode(data.code, props.account);
    if (result.status === 200) {
      addToast({ message: 'Đăng ký thành công', type: 'success' });
      history.push('/auth/login');
    } else {
      apiResult.current.innerHTML = result.message;
    }
  };

  const getVerifyCodeAgain = async () => {
    const resetCode = await AuthenticationAPI.reGetCode(props.account);
    console.log(resetCode);
  };

  return (
    <form className='form' onSubmit={handleSubmit(submitCode)}>
      <Grid container spacing={2}>
        <Grid item xs={12} className='h-d_flex -align-center'>
          <StyledTypography>
            Kiểm tra email và nhập mã xác nhận:
          </StyledTypography>

          <Typography
            onClick={getVerifyCodeAgain}
            className='h-ml-20 -cursor-pointer'
            style={{ color: 'red' }}
          >
            Gửi lại
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            fullWidth
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: 'labelAsterisk',
              },
            }}
            id='code'
            label='Mã kích hoạt'
            name='code'
            autoFocus
            required
            inputRef={register({
              pattern: {
                value: /^(?=.{6,6}$)[0-9]*$/,
              },
            })}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography className='resultAPI' ref={apiResult}>
            {errors.code && 'Mã kích hoạt sai'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButton color='success' fullWidth type='submit'>
            Xác nhận
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
}
