import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../slices/authentication";
import { login } from "../../../utils/authentication.dao";
import { STATUS_OK } from "../../../utils/handleAPI";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#2ea44f",
    color: "white",
    '&:hover': {
      backgroundColor: "#2ea44f",
    }
  },
  labelAsterisk: {
    color: "red"
  }
}));

export default function LoginForm() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const notify = React.useRef(null);

  const submitForm = async (data) => {
    //handle
    const result = await login(data);
    if (result.status === STATUS_OK) {
      dispatch(loginSuccess(result.message));
      localStorage.setItem("auth-token", result.token);
    } else {
      notify.current.innerHTML = result.message;
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
                asterisk: classes.labelAsterisk
              }
            }}
            id="username"
            label="Tên đăng nhập"
            name="username"
            autoFocus
            required
            inputRef={register({ minLength: 6, maxLength: 16 })}
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
                asterisk: classes.labelAsterisk
              }
            }}
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            required
            inputRef={register({ minLength: 6 })}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h1" color="error" ref={notify}>
            {(errors.username || errors.password) &&
              "Sai tên tài khoản hoặc mật khẩu"}
          </Typography>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.submit}
      >
        Đăng nhập
      </Button>
    </form>
  );
}
