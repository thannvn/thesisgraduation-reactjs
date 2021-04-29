import { Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import AuthenticationAPI from 'api/authentication-api';
import { STATUS_OK } from 'services/axios/common-services.const';
import { StyledValidate } from '../../../../../styles/jss/custom.component';
import Password from '../../_common/password.component';
import CustomButton from 'dataworld/parts/button/custom-button.component';

export default function RegisterForm(props) {
  const { register, handleSubmit, errors, watch } = useForm();
  const apiResult = React.useRef(null);

  const submitForm = async (data) => {
    //submit form register
    const result = await AuthenticationAPI.registerAccount(data);
    if (result.status === STATUS_OK) {
      props.setId(result.data);
    } else {
      //handle
      apiResult.current.innerHTML = result.message;
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete='fname'
            name='firstName'
            variant='outlined'
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: 'labelAsterisk',
              },
            }}
            id='firstName'
            label='Họ'
            autoFocus
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: 'labelAsterisk',
              },
            }}
            id='lastName'
            label='Tên'
            name='lastName'
            autoComplete='name'
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: 'labelAsterisk',
              },
            }}
            id='email'
            label='Địa chỉ email'
            name='email'
            autoComplete='email'
            inputRef={register({
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
          />
          <StyledValidate>
            {errors.email && 'Email không đúng định dạng'}
          </StyledValidate>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            variant='outlined'
            fullWidth
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: 'labelAsterisk',
              },
            }}
            id='username'
            label='Tên đăng nhập'
            name='username'
            inputRef={register({
              pattern: /^(?=.{6,}$)[a-zA-Z0-9]+$/,
            })}
          />
          <StyledValidate>
            {errors.username &&
              'Tên tài khoản lớn hơn 6 ký tự, không sử dụng các ký tự đặc biệt'}
          </StyledValidate>
        </Grid>

        <Password register={register} watch={watch} errors={errors} />
        <Grid item xs={12}>
          <Typography className='resultAPI' ref={apiResult}></Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButton color='success' fullWidth type='submit'>
            Tiếp theo
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
}
