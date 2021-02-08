/* Authentication */
interface ApiTemplate {
  method: 'GET' | 'POST' | 'DELETE' | 'UPDATE',
  URL: string
}

const POST_LOGIN: ApiTemplate = {
  method: "POST",
  URL: "auth/login",
};
const GET_LOGOUT: ApiTemplate = {
  method: "GET",
  URL: "auth/logout",
};
const GET_LOGIN: ApiTemplate = {
  method: "GET",
  URL: "auth/login",
};
const POST_REGISTER_ACCOUNT: ApiTemplate = {
  method: "POST",
  URL: "auth/register",
};
const POST_VERIFY_ACCOUNT: ApiTemplate = {
  method: "POST",
  URL: "auth/verify-account",
};

const POST_FORGOT_PASSWORD: ApiTemplate = {
  method: "POST",
  URL: "auth/forgot-password"
}

const POST_RESET_PASSWORD: ApiTemplate = {
  method: "POST",
  URL: "auth/reset-password"
}

const POST_LOGIN_GOOGLE: ApiTemplate = {
  method: "POST",
  URL: "auth/login-google"
}

const POST_LOGIN_FACEBOOK: ApiTemplate = {
  method: "POST",
  URL: "auth/login-facebook"
}


/*Profile */
const GET_PROFILE: ApiTemplate = {
  method: "GET",
  URL: 'profile'
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
    POST_LOGIN_FACEBOOK,
    GET_PROFILE
  };