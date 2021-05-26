import axios from 'axios';
import addToast from 'dataworld/parts/toast/add-toast.component';
import { fetchLogin } from 'redux/authentication-slice';
import store from 'store';
import { ApiTemplate } from './common-services.const';

const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

export interface Result<T> {
  status: number,
  message: string,
  token: string | any,
  data: T | any,
}

const configAPI = (API: any, data?: any) => {
  return {
    method: API.method,
    url: BASE_URL_API + API.URL,
    headers: {
      "auth-token": localStorage.getItem("auth-token"),
    },
    data: data,
  };
};


const createResult = <T>(result?: any, errors?: any, dataType?: T): Result<T> => {
  let apiResult: Result<T> = {
    status: 0,
    message: '',
    token: undefined,
    data: dataType,
  }

  if (result) {
    apiResult = {
      status: result.status,
      message: result.data.message,
      token: result.data.token,
      data: result.data.data,
    }

  } else {
    apiResult = {
      ...apiResult,
      status: errors.response.status,
      message: errors.response.data.message,
    }
  }
  return apiResult
};

const requestAPI = async <T>(URL: ApiTemplate, data?: any): Promise<Result<T>> => {
  try {
    const isLogin = await fetchLogin(store.dispatch)
    if (!isLogin) {
      addToast({ message: 'Phiên đăng nhập đã hết hạn, hãy đăng nhập lại', type: 'error' })
      window.location.href = '/auth/login'
    }
    const result = await axios.request(configAPI(URL, data))
    return createResult<T>(result)
  } catch (error) {
    const result = createResult(null, error)
    addToast({ message: result.message, type: 'error' })
    return result
  }
}

const requestApiNotCheckLogin = async <T>(URL: ApiTemplate, data?: any): Promise<Result<T>> => {
  try {
    const result = await axios.request(configAPI(URL, data))
    return createResult<T>(result)
  } catch (error) {
    return createResult(null, error)
  }
}

export {
  configAPI,
  createResult,
  requestAPI,
  requestApiNotCheckLogin
};

