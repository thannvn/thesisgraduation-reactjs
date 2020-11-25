import { createSlice } from "@reduxjs/toolkit";
import { configAPI, GET_LOGIN_API } from "../common/handleAPI";
import axios from "axios";

const fetchLogin = async (dispatch, getState) => {
  try {
    const result = await axios.request(configAPI(GET_LOGIN_API));
    if (result.status === 200) {
      dispatch(loginSuccess(result.data.message));
    }
  } catch (error) {
    console.error(error);
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
export {fetchLogin};
export default reducer;
