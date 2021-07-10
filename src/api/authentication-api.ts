import {
  CHECK_LOGIN, FORGOT_PASSWORD,
  GET_NEW_ACCESS_TOKEN, LOGIN,
  LOGIN_FACEBOOK,
  LOGIN_GOOGLE,
  LOGOUT, REGISTER_ACCOUNT,
  RESET_PASSWORD, VERIFY_ACCOUNT,
  RE_GET_VERIFY_CODE
} from 'app/const/api-const/authentication-url.const';
import axios from 'axios';
import { configAPI, createResult, requestApiNotCheckLogin } from 'services/axios/handle-api.const';

export default class AuthenticationAPI {
  /* login */
  static login = async (account: any) => {
    return await requestApiNotCheckLogin(LOGIN, account)
  };

  /* Register account */
  static registerAccount = async (account: any) => {
    return await requestApiNotCheckLogin(REGISTER_ACCOUNT, account)
  };

  /* Get login status: logged or not */
  static getLoginStatus = async () => {
    return requestApiNotCheckLogin(CHECK_LOGIN)
  };

  /* Send verify code to backend */
  static sendCode = async (code: any, accountId: any) => {
    const data = {
      verifyCode: code,
      accountId: accountId,
    };
    return await requestApiNotCheckLogin(VERIFY_ACCOUNT, data)
  };

  /* Send email to get link reset email */
  static forgotPassword = async (email: string) => {
    const data = {
      email: email,
    };
    return await requestApiNotCheckLogin(FORGOT_PASSWORD, data)
  };

  /* Reset password */
  static resetPassword = async (resetCode: string, newPassword: string) => {
    try {
      const data = {
        password: newPassword,
      };
      const result = await axios.request({
        method: "POST",
        url: RESET_PASSWORD.URL,
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "reset-password-token": resetCode,
        },
        data: data,
      });
      return createResult(result);
    } catch (error) {
      return createResult(null, error);
    }
  };

  /* Login with facebook */
  static loginGoogle = async (accessToken: string, profile: any) => {
    const data = {
      accessToken: accessToken,
      profile: profile,
    };
    return await requestApiNotCheckLogin(LOGIN_GOOGLE, data)
  };

  /* Login with google */
  static loginFacebook = async (accessToken: string, profile: any) => {
    const data = {
      accessToken: accessToken,
      profile: profile,
    };
    return await requestApiNotCheckLogin(LOGIN_FACEBOOK, data)
  };

  /* Get new access token */
  static getNewAccessToken = async () => {
    const data = {
      refreshToken: localStorage.getItem('refresh-token'),
    }
    return requestApiNotCheckLogin(GET_NEW_ACCESS_TOKEN, data)
  };

  /* Logout */
  static logout = async () => {
    const data = {
      refreshToken: localStorage.getItem('refresh-token'),
    }
    try {
      const result = await axios.request(configAPI(LOGOUT, data))
      localStorage.removeItem('auth-token');
      localStorage.removeItem('refresh-token');
      return createResult(result)
    } catch (error) {
      return createResult(null, error)
    }
  };

  /* Send email to get link reset email */
  static reGetCode = async (accountId: string) => {
    const data = {
      accountId: accountId,
    };
    return await requestApiNotCheckLogin(RE_GET_VERIFY_CODE, data)
  };

}
