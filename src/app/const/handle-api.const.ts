const BASE_URL_API = "http://localhost:3000/api/";
interface Result {
  status: number,
  message: string,
  token: string,
}
const configAPI = (API: any, data?: any) => {
  return {
    method: API.method,
    url: BASE_URL_API + API.URL,
    headers: {
      "Auth-Token": localStorage.getItem("auth-token"),
      "ResetPassword-Token": localStorage.getItem("resetPassword-token"),
      "Content-Type": "application/json",
    },
    data: data,
  };
};


const createResult = (result?: any, errors?: any): Result => {
  let status, message, token;
  if (result) {
    status = result.status;
    message = result.data.message;
    token = result.data.token;
  } else {
    status = errors.response.status;
    message = errors.response.data.message;
  }
  return {
    status: status,
    message: message,
    token: token
  } as Result
};

export {
  configAPI,
  createResult
};
