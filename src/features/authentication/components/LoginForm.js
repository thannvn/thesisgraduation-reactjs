import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { configAPI, POST_LOGIN_API } from "../../../common/handleAPI";
import { loginSuccess } from "../../../slices/authentication";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
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
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const notify = React.useRef(null);

  const submitForm = async (data) => {
    //handle
    try {
      const result = await axios.request(configAPI(POST_LOGIN_API, data))
      if (result.status === 200) {
        dispatch(loginSuccess(result.data.message));
        localStorage.setItem("auth-token", result.data.token);
      }
    } catch (error) {
      notify.current.innerHTML = error.response.data.message;
      console.error(error)
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
            id="username"
            label="Tên đăng nhập"
            name="username"
            autoFocus
            required
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            required
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            component="h1"
            color="error"
            ref={notify}
          ></Typography>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Đăng nhập
      </Button>
    </form>
  );
}
