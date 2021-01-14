import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../slices/authentication";
import { STATUS_OK } from "../../../utils/handleAPI";
import AuthenticationDao from "../../../utils/authentication.dao";
import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { TiSocialFacebook } from "react-icons/ti";
const useStyles = makeStyles((theme) => ({
  facebook: {
    width: "200px",
    fontSize: "14px !important",
    height: "43px",
    background: "#3B5998",
    color: "white",
    alignContent: "center",
    cursor: "pointer",
  },
}));

export default function LoginFacebook(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const responseFacebook = async (response) => {
    // const result = await AuthenticationDao.loginGoogle(
    //   success.accessToken,
    //   success.profileObj
    // );
    // if (result.status === STATUS_OK) {
    //   dispatch(loginSuccess(result.message));
    //   localStorage.setItem("auth-token", result.token);
    // }
    console.log(response);
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      fields="name,email,picture"
      icon="fa-facebook"
      render={(renderProps) => (
        <>
          <button onClick={renderProps.onClick} className={classes.facebook}>
            <TiSocialFacebook size={25} />
            Đăng nhập với Facebook
          </button>
        </>
      )}
      callback={responseFacebook}
    ></FacebookLogin>
  );
}
