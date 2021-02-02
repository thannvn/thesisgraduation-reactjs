import axios from 'axios';
import { configAPI, createResult} from '../app/const/handle-api.const';
import {
  POST_LOGIN,
  POST_FORGOT_PASSWORD,
  POST_LOGIN_FACEBOOK,
  POST_VERIFY_ACCOUNT,
  GET_LOGIN,
  POST_LOGIN_GOOGLE,
  POST_REGISTER_ACCOUNT,
  POST_RESET_PASSWORD,
} from '../app/const/url-api.const';


export default class AuthenticationDao {
  /* login */
  static login = async (account) => {
    //handle
    try {
      const result = await axios.request(configAPI(POST_LOGIN, account));
      return createResult(result);
    } catch (error) {
      return createResult(null, error);
    }
  };

  /* Register account */
  static registerAccount = async (account) => {
    //handle
    try {
      const result = await axios.request(
        configAPI(POST_REGISTER_ACCOUNT, account)
      );
      return createResult(result);
    } catch (error) {
      return createResult(null, error);
    }
  };

  /* Get login status: logged or not */
  static getLoginStatus = async () => {
    //handle
    try {
      const result = await axios.request(configAPI(GET_LOGIN));
      return createResult(result);
    } catch (error) {
      return createResult(null, error);
    }
  };

  /* Send verify code to backend */
  static sendCode = async (code, accountId) => {
    //handle
    try {
      const data = {
        verifyCode: code,
        accountId: accountId,
      };
      const result = await axios.request(configAPI(POST_VERIFY_ACCOUNT, data));
      return createResult(result);
    } catch (error) {
      return createResult(null, error);
    }
  };

  /* Send email to get link reset email */
  static forgotPassword = async (email) => {
    //handle
    try {
      const data = {
        email: email,
      };
      const result = await axios.request(configAPI(POST_FORGOT_PASSWORD, data));
      console.log(result);
      return createResult(result);
    } catch (error) {
      return createResult(null, error);
    }
  };

  /* Reset password */
  static resetPassword = async (newPassword) => {
    try {
      const data = {
        password: newPassword,
      };
      const result = await axios.request(configAPI(POST_RESET_PASSWORD, data));
      return createResult(result);
    } catch (error) {
      return createResult(null, error);
    }
  };

  /* Login with facebook */
  static loginGoogle = async (accessToken, profile) => {
    try {
      const data = {
        accessToken: accessToken,
        profile: profile,
      };
      const result = await axios.request(configAPI(POST_LOGIN_GOOGLE, data));
      return createResult(result);
    } catch (error) {
      return createResult(null, error);
    }
  };

  /* Login with google */
  static loginFacebook = async (accessToken, profile) => {
    console.log(profile);
    try {
      const data = {
        accessToken: accessToken,
        profile: profile,
      };
      const result = await axios.request(configAPI(POST_LOGIN_FACEBOOK, data));
      return createResult(result);
    } catch (error) {
      return createResult(null, error);
    }
  };
}
