import React from 'react';
import { Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import AuthenticationAPI from 'api/authentication-api';
import { STATUS_OK } from 'services/axios/common-services.const';
import Password from '../../_common/password.component';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from 'redux/authentication-slice';
import CustomButton from 'dataworld/parts/button/custom-button.component';
import addToast from 'dataworld/parts/toast/add-toast.component';

export default function ResetPasswordForm(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, watch } = useForm();

  const submitForm = async (data) => {
    //submit form register
    const result = await AuthenticationAPI.resetPassword(
      props.resetCode,
      data.password
    );
    if (result.status === STATUS_OK) {
      await AuthenticationAPI.logout();
      dispatch(logoutSuccess());
      addToast({ message: 'Đổi mật khẩu thành công', type: 'success' });
      history.push('/auth/login');
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
