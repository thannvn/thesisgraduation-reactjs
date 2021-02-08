import { createSlice } from "@reduxjs/toolkit";
import AuthenticationDao from "../api/authentication-api";
import { STATUS_OK } from "../app/const/status-api.const";

const fetchLogin = async (dispatch, getState) => {
  const result = await AuthenticationDao.getLoginStatus()
  if (result.status === STATUS_OK) {
    dispatch(loginSuccess(result.message));
  } 
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
    },
  },
});

const { actions, reducer } = authenticationSlice;
export const { loginSuccess, logoutSuccess } = actions;
export { fetchLogin };
export default reducer;