import { Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomButton from "../../../components/custom/CustomButton";
import { loginSuccess } from "../../../slices/authentication";
import { login } from "../../../utils/authentication.dao";
import { STATUS_OK } from "../../../utils/handleAPI";
import "../css/style.css";

export default function LoginForm() {
  const { register, handleSubmit, errors, setError } = useForm();
  const dispatch = useDispatch();
  const submitForm = async (data) => {
    //handle
    const result = await login(data);
    if (result.status === STATUS_OK) {
      dispatch(loginSuccess(result.message));
      localStorage.setItem("auth-token", result.token);
    } else {
      setError("apiResult", { message: result.message });
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
                value: /^(?=.{6,}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._@]+(?<![_.])$/,
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
          <Typography className="resultAPI">
            {(errors.username || errors.password || errors.apiResult) &&
              "Sai tên tài khoản hoặc mật khẩu"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButton color="success" fullWidth>
            Đăng nhập
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
}
