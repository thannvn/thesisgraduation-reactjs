import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../../redux/authentication";
import { STATUS_OK } from "../../../const/status-api.const";
import AuthenticationAPI from "../../../../api/authentication-api";
import '../css/login-google.scss'

export default function LoginGoogle(props) {
  const dispatch = useDispatch();
  const successResponse = async (success) => {
    const result = await AuthenticationAPI.loginGoogle(
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
      className='login-google'
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Google"
      onSuccess={successResponse}
      onFailure={failureResponse}
      cookiePolicy={"single_host_origin"}
    />
  );
}
