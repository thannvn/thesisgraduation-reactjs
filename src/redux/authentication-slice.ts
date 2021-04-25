import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthenticationAPI from "../api/authentication-api";
import { STATUS_OK } from "services/axios/common-services.const";
import { AppDispatch } from "store";

const fetchLogin = async (dispatch: AppDispatch) => {
  const result = await AuthenticationAPI.getLoginStatus()
  if (result.status === STATUS_OK) dispatch(loginSuccess(result.data))
  else {
    const newResult = await AuthenticationAPI.getNewAccessToken()
    if (newResult.status === STATUS_OK) {
      localStorage.setItem('auth-token', newResult.token)
      dispatch(loginSuccess(newResult.data))
    }
    else {
      await AuthenticationAPI.logout()
      dispatch(logoutSuccess());
    }
  }
};

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
