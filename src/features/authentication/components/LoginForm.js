import { Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { BUTTON_LOGIN } from "../../../css/color";
import { loginSuccess } from "../../../slices/authentication";
import { login } from "../../../utils/authentication.dao";
import { STATUS_OK } from "../../../utils/handleAPI";
import { StyledButton } from "../css/custom.component";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  labelAsterisk: {
    color: "red",
  },
  resultAPI: {
    fontSize: "1.2rem",
  },
}));

export default function LoginForm() {
  const classes = useStyles();
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
    <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: classes.labelAsterisk,
              },
            }}
            id="username"
            label="Tên đăng nhập"
            name="username"
            autoFocus
            required
            inputRef={register({
              pattern: {
                value: /^[a-zA-Z0-9](?=.*\d){6,16}$/,
              },
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: classes.labelAsterisk,
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
          <Typography className={classes.resultAPI} color="error">
            {(errors.username || errors.password || errors.apiResult) &&
              "Sai tên tài khoản hoặc mật khẩu"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <StyledButton
            color={BUTTON_LOGIN}
            type="submit"
            fullWidth
            variant="contained"
          >
            Đăng nhập
          </StyledButton>
        </Grid>
      </Grid>
    </form>
  );
}
