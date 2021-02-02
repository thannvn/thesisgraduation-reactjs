import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../../redux/authentication';
import { STATUS_OK } from '../../../const/status-api.const';
import AuthenticationDao from '../../../../api/authentication-api';
import React from 'react';
import { TiSocialFacebook } from 'react-icons/ti';
import '../css/login-facebook.scss';

export default function LoginFacebook(props) {
  const dispatch = useDispatch();
  const responseFacebook = async (response) => {
    console.log(response.picture.data.url)
    const profile = {email: response.email, avatar: response.picture.data.url}
    const result = await AuthenticationDao.loginFacebook(
      response.accessToken,
      profile
    );
    if (result.status === STATUS_OK) {
      dispatch(loginSuccess(result.message));
      localStorage.setItem("auth-token", result.token);
    }
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      fields='name,email,picture'
      render={(renderProps) => (
        <>
          <button onClick={renderProps.onClick} className='facebook-button'>
            <TiSocialFacebook size={24} className='icon-facebook' />
            <span className='span-facebook'>Facebook</span>
          </button>
        </>
      )}
      callback={responseFacebook}
    ></FacebookLogin>
  );
}
