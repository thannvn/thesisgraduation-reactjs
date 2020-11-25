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
import { configAPI, POST_REGISTER_API } from "../../../common/handleAPI";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const notify = React.useRef(null);
  const submitForm = async (data) => {
    //submit form register
    try {
      const result = await axios.request(configAPI(POST_REGISTER_API, data));
      if (result.status === 200) {
        notify.current.innerHTML =
          "Đăng ký thành công. Kiểm tra email của bạn ";
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="Họ"
            autoFocus
            inputRef={register}
          />
          <Typography></Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="lastName"
            label="Tên"
            name="lastName"
            autoComplete="lname"
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Địa chỉ email"
            name="email"
            autoComplete="email"
            inputRef={register({
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              },
            })}
          />
          <Typography variant="h6" component="h1" color="error">
            {errors.email && "Email không đúng định dạng"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
            fullWidth
            id="username"
            label="Tên đăng nhập"
            name="username"
            inputRef={register({ minLength: 6, maxLength: 16 })}
          />
          <Typography variant="h6" component="h1" color="error">
            {errors.username && "Tên đăng nhập phải có 6-16 ký tự"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            inputRef={register({ minLength: 6 })}
          />
          <Typography variant="h6" component="h1" color="error">
            {errors.password && "Mật khẩu phải lớn hơn 6 ký tự"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h1" color="error" ref={notify} />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Đăng ký
      </Button>
    </form>
  );
}
