import axios from "axios";
import {
  configAPI,
  GET_LOGIN,
  POST_FORGOT_PASSWORD,
  POST_LOGIN,
  POST_REGISTER_ACCOUNT,
  POST_RESET_PASSWORD,
  POST_VERIFY_ACCOUNT,
} from "./handleAPI";

/* login */
const login = async (account) => {
  //handle
  try {
    const result = await axios.request(configAPI(POST_LOGIN, account));
    return createResult(result.status, result.data.message);
  } catch (error) {
    return createResult(error.response.status, error.response.data.message);
  }
};

/* Register account */
const registerAccount = async (account) => {
  //handle
  try {
    const result = await axios.request(
      configAPI(POST_REGISTER_ACCOUNT, account)
    );
    return createResult(result.status, result.data.message);
  } catch (error) {
    return createResult(error.response.status, error.response.data.message);
  }
};

/* Get login status: logged or not */
const getLoginStatus = async () => {
  //handle
  try {
    const result = await axios.request(configAPI(GET_LOGIN));
    return createResult(result.status, result.data.message);
  } catch (error) {
    return createResult(error.response.status, error.response.data.message);
  }
};

/* Send verify code to backend */
const sendCode = async (code, accountId) => {
  //handle
  try {
    const data = {
      verifyCode: code,
      accountId: accountId,
    };
    const result = await axios.request(configAPI(POST_VERIFY_ACCOUNT, data));
    return createResult(result.status, result.data.message);
  } catch (error) {
    return createResult(error.response.status, error.response.data.message);
  }
};

/* Send email to get link reset email */
const forgotPassword = async (email) => {
  //handle
  try {
    const data = {
      email: email,
    };
    const result = await axios.request(configAPI(POST_FORGOT_PASSWORD, data));
    return createResult(result.status, result.data.message);
  } catch (error) {
    return createResult(error.response.status, error.response.data.message);
  }
};

/* Reset password */
const resetPassword = async (newPassword) => {
  try {
    const data = {
      newPassword: newPassword,
    };
    const result = await axios.request(configAPI(POST_RESET_PASSWORD, data));
    return createResult(result.status, result.data.message);
  } catch (error) {
    return createResult(error.response.status, error.response.data.message);
  }
};
const createResult = (status, message) => {
  return {
    status: status,
    message: message,
  };
};

export { login, registerAccount, getLoginStatus, sendCode, forgotPassword, resetPassword };
