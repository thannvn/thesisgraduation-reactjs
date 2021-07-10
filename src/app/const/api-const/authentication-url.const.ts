import { ApiTemplate } from 'services/axios/common-services.const'

const LOGIN: ApiTemplate = {
  method: "POST",
  URL: "auth/login",
};

const LOGOUT: ApiTemplate = {
  method: "POST",
  URL: "auth/logout"
}
const CHECK_LOGIN: ApiTemplate = {
  method: "GET",
  URL: "auth/login",
};
const REGISTER_ACCOUNT: ApiTemplate = {
  method: "POST",
  URL: "auth/register",
};
const VERIFY_ACCOUNT: ApiTemplate = {
  method: "POST",
  URL: "auth/verify-account",
};

const FORGOT_PASSWORD: ApiTemplate = {
  method: "POST",
  URL: "auth/forgot-password"
}

const RESET_PASSWORD: ApiTemplate = {
  method: "POST",
  URL: `${process.env.REACT_APP_BASE_URL_API}auth/reset-password`
}

const LOGIN_GOOGLE: ApiTemplate = {
  method: "POST",
  URL: "auth/login-google"
}

const LOGIN_FACEBOOK: ApiTemplate = {
  method: "POST",
  URL: "auth/login-facebook"
}

const GET_NEW_ACCESS_TOKEN: ApiTemplate = {
  method: "POST",
  URL: "auth/refresh-token"
}

const RE_GET_VERIFY_CODE: ApiTemplate = {
  method: "POST",
  URL: "auth/get-verify-code"
}

export {
  LOGIN,
  LOGOUT,
  REGISTER_ACCOUNT,
  CHECK_LOGIN,
  VERIFY_ACCOUNT,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  LOGIN_GOOGLE,
  LOGIN_FACEBOOK,
  GET_NEW_ACCESS_TOKEN,
  RE_GET_VERIFY_CODE
};