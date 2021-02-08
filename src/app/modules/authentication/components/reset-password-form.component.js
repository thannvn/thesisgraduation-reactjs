import { Grid } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import AuthenticationAPI from '../../../../api/authentication-api';
import { STATUS_OK } from '../../../const/status-api.const';
import Password from './common/password.component';
import CustomButton from '../../../../dataworld/parts/button/custom-button.component';
import addToast from '../../../../dataworld/parts/toast/add-toast.component';

export default function ResetPasswordForm(props) {
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm();
  
  const submitForm = async (data) => {
    //submit form register
    const result = await AuthenticationAPI.resetPassword(data.password);
    if (result.status === STATUS_OK) {
      history.push({
        pathname: '/auth/login',
      });
      addToast({ message: 'Đổi mật khẩu thành công', type: "success"});
      localStorage.removeItem('resetPassword-token');
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
        <Password register={register} watch={watch} errors={errors} />
        <Grid item xs={12}>
          <CustomButton color='success' fullWidth type='submit'>
            Đổi mật khẩu
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
}
