import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../slices/authentication";
import { STATUS_OK } from "../../../utils/handleAPI";
import AuthenticationDao from "../../../utils/authentication.dao";

export default function LoginGoogle(props) {
  const dispatch = useDispatch();
  const successResponse = async (success) => {
    const result = await AuthenticationDao.loginGoogle(
      success.accessToken,
      success.profileObj
    );
    if (result.status === STATUS_OK) {
      dispatch(loginSuccess(result.message));
      localStorage.setItem("auth-token", result.token);
    }
  };
  const failureResponse = (fail) => {
    console.log(fail);
  };

  return (
    <GoogleLogin
      className={props.className}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Đăng nhập qua Google"
      onSuccess={successResponse}
      onFailure={failureResponse}
      cookiePolicy={"single_host_origin"}
    />
  );
}
