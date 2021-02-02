const POST_LOGIN = {
  method: "POST",
  URL: "auth/login",
};
const GET_LOGOUT = {
  method: "GET",
  URL: "auth/logout",
};
const GET_LOGIN = {
  method: "GET",
  URL: "auth/login",
};
const POST_REGISTER_ACCOUNT = {
  method: "POST",
  URL: "auth/register",
};
const POST_VERIFY_ACCOUNT = {
  method: "POST",
  URL: "auth/verify-account",
};

const POST_FORGOT_PASSWORD = {
  method: "POST",
  URL: "auth/forgot-password"
}

const POST_RESET_PASSWORD = {
  method: "POST",
  URL: "auth/reset-password"
}

const POST_LOGIN_GOOGLE = {
  method: "POST",
  URL: "auth/login-google"
}

const POST_LOGIN_FACEBOOK = {
  method: "POST",
  URL: "auth/login-facebook"
}


export {
    POST_LOGIN,
    GET_LOGOUT,
    POST_REGISTER_ACCOUNT,
    GET_LOGIN,
    POST_VERIFY_ACCOUNT,
    POST_FORGOT_PASSWORD,
    POST_RESET_PASSWORD,
    POST_LOGIN_GOOGLE,
    POST_LOGIN_FACEBOOK
  };