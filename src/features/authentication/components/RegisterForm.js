import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { registerAccount } from "../../../utils/authentication.dao";
import { STATUS_OK } from "../../../utils/handleAPI";
import Password from "./Password";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    marginBottom: theme.spacing(3),
  },
  labelAsterisk: {
    color: "red",
  },
}));

export default function RegisterForm(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors, watch, setError } = useForm();
  const submitForm = async (data) => {
    //submit form register
    const result = await registerAccount(data);
    if (result.status === STATUS_OK) {
      props.setId(result.message);
    } else {
      //handle
      setError("apiResult", { message: result.message });
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
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: classes.labelAsterisk,
              },
            }}
            id="firstName"
            label="Họ"
            autoFocus
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: classes.labelAsterisk,
              },
            }}
            id="lastName"
            label="Tên"
            name="lastName"
            autoComplete="name"
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
              classes: {
                asterisk: classes.labelAsterisk,
              },
            }}
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
          <Typography component="p" color="error">
            {errors.email && "Email không đúng định dạng"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            variant="outlined"
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
            inputRef={register({ minLength: 6, maxLength: 16 })}
          />
          <Typography component="p" color="error">
            {errors.username && "Tên đăng nhập phải có 6-16 ký tự"}
          </Typography>
        </Grid>
        <Password register={register} watch={watch} errors={errors} />
        <Grid item xs={12}>
          <Typography component="p" color="error">
            {errors.apiResult && errors.apiResult.message}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Tiếp theo
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
