const BASE_URL_API = "http://localhost:3000/api/";
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

const STATUS_OK = 200
const configAPI = (API, data) => {
  return {
    method: API.method,
    url: BASE_URL_API + API.URL,
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
      "resetPassword-token": localStorage.getItem("resetPassword-token"),
      "Content-Type": "application/json",
    },
    data: data,
  };
};

export {
  configAPI,
  POST_LOGIN,
  GET_LOGOUT,
  POST_REGISTER_ACCOUNT,
  GET_LOGIN,
  POST_VERIFY_ACCOUNT,
  STATUS_OK,
  POST_FORGOT_PASSWORD,
  POST_RESET_PASSWORD
};
