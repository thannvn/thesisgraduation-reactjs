import { Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomButton from "../../../components/custom/CustomButton";
import { loginSuccess } from "../../../slices/authentication";
import AuthenticationDao from "../../../utils/authentication.dao";
import { STATUS_OK } from "../../../utils/handleAPI";
import "../css/style.css";

export default function LoginForm() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const apiResult = React.useRef(null);
  const submitForm = async (data) => {
    //handle
    const result = await AuthenticationDao.login(data);
    if (result.status === STATUS_OK) {
      dispatch(loginSuccess(result.message));
      localStorage.setItem("auth-token", result.token);
    } else {
      apiResult.current.innerHTML = result.message;
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: "labelAsterisk",
              },
            }}
            id="username"
            label="Tên đăng nhập"
            name="username"
            autoFocus
            required
            inputRef={register({
              pattern: {
                value: /^(?=.{6,}$)[a-zA-Z0-9._@]+(?<![_.@])$/,
              },
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: "labelAsterisk",
              },
            }}
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            required
            inputRef={register({
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{6,}$/,
              },
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className="resultAPI" ref={apiResult}>
            {(errors.username || errors.password) &&
              "Sai tên tài khoản hoặc mật khẩu"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButton color="success" fullWidth type="submit">
            Đăng nhập
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
}
