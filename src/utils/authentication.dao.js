import axios from "axios";
import {
  configAPI,
  GET_LOGIN,
  POST_FORGOT_PASSWORD,
  POST_LOGIN,
  POST_REGISTER_ACCOUNT,
  POST_RESET_PASSWORD,
  POST_VERIFY_ACCOUNT,
  POST_LOGIN_GOOGLE,
} from "./handleAPI";

export default class AuthenticationDao {
  /* login */
  static login = async (account) => {
    //handle
    try {
      const result = await axios.request(configAPI(POST_LOGIN, account));
      return this.createResult(result);
    } catch (error) {
      return this.createResult(null, error);
    }
  };

  /* Register account */
  static registerAccount = async (account) => {
    //handle
    try {
      const result = await axios.request(
        configAPI(POST_REGISTER_ACCOUNT, account)
      );
      return this.createResult(result);
    } catch (error) {
      return this.createResult(null, error);
    }
  };

  /* Get login status: logged or not */
  static getLoginStatus = async () => {
    //handle
    try {
      const result = await axios.request(configAPI(GET_LOGIN));
      return this.createResult(result);
    } catch (error) {
      return this.createResult(null, error);
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
      return this.createResult(result);
    } catch (error) {
      return this.createResult(null, error);
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
      return this.createResult(result);
    } catch (error) {
      return this.createResult(null, error);
    }
  };

  /* Reset password */
  static resetPassword = async (newPassword) => {
    try {
      const data = {
        password: newPassword,
      };
      const result = await axios.request(configAPI(POST_RESET_PASSWORD, data));
      return this.createResult(result);
    } catch (error) {
      return this.createResult(null, error);
    }
  };

  /* Login with google */
  static loginGoogle = async (accessToken, profile) => {
    try {
      const data = {
        accessToken: accessToken,
        profile: profile,
      };
      const result = await axios.request(configAPI(POST_LOGIN_GOOGLE, data));
      return this.createResult(result);
    } catch (error) {
      return this.createResult(null, error);
    }
  };

  static createResult = (result = null, errors = null) => {
    let status, message, token;
    if (result) {
      status = result.status;
      message = result.data.message;
      token = result.data.token;
    } else {
      status = errors.response.status;
      message = errors.response.message;
    }
    return {
      status: status,
      message: message,
      token: token,
    };
  };
}
