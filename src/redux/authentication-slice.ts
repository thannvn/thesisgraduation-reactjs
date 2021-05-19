import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthenticationAPI from "../api/authentication-api";
import { STATUS_OK } from "services/axios/common-services.const";
import { AppDispatch } from "store";

const fetchLogin = async (dispatch: AppDispatch) => {
  //check login status
  const loginResult = await AuthenticationAPI.getLoginStatus()
  if (loginResult.status === STATUS_OK) {
    dispatch(loginSuccess(loginResult.data))
    return true
  }

  //if access token expired, get new access token by refresh token
  const newLoginResult = await AuthenticationAPI.getNewAccessToken()
  if (newLoginResult.status === STATUS_OK) {
    localStorage.setItem('auth-token', newLoginResult.token)
    dispatch(loginSuccess(newLoginResult.data))
    return true
  }

  //if refresh token expired => logout
  await AuthenticationAPI.logout()
  dispatch(logoutSuccess());
  return false
}

interface User {
  accountId: string,
  avatar: string,
  username: string,
  name: string,
}

interface InitialState {
  user: User
}
const initialState: InitialState = {
  user: {
    accountId: '',
    avatar: '',
    username: '',
    name: '',
  }
}

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, { payload }: PayloadAction<User>) => {
      state.user = payload
    },
    logoutSuccess: (state) => {
      state.user.accountId = '';
      state.user.avatar = '';
      state.user.username = '';
      state.user.name = '';
    },
  },
});

const { actions, reducer } = authenticationSlice;
export const { loginSuccess, logoutSuccess } = actions;
export { fetchLogin };
export default reducer;
