
const BASE_URL_API = "http://localhost:3000/api/";
const POST_LOGIN_API = {
  method: "POST",
  URL: "auth/login",
};
const GET_LOGOUT_API = {
  method: "GET",
  URL: "auth/logout",
};
const GET_LOGIN_API = {
  method: "GET",
  URL: "auth/login",
};
const POST_REGISTER_API = {
  method: "POST",
  URL: "auth/register",
};

const configAPI = (API, data) => {
  return {
    method: API.method,
    url: BASE_URL_API + API.URL,
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
      "Content-Type": "application/json",
    },
    data: data,
  };
};

export {
  configAPI,
  POST_LOGIN_API,
  GET_LOGOUT_API,
  POST_REGISTER_API,
  GET_LOGIN_API,
};
