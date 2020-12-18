import { Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  labelAsterisk: {
    color: "red",
  },
}));

export default function Password({ register, watch, errors }) {
  const classes = useStyles();
  const password = React.useRef({});
  //watch current password
  password.current = watch("password");

  return (
    <>
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
          name="password"
          label="Mật khẩu"
          type="password"
          id="password"
          inputRef={register({
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i,
            },
          })}
        />
        <Typography component="p" color="error">
          {errors.password && "Mật khẩu phải có ít nhất 6 ký tự, trong đó có ít nhất 1 ký tự là chữ và số"}
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
          name="rePassword"
          label="Nhập lại mật khẩu"
          type="password"
          id="rePassword"
          inputRef={register({
            validate: (value) =>
              value === password.current || "Mật khẩu không khớp. Hãy thử lại",
          })}
        />
        <Typography component="p" color="error">
          {errors.rePassword && errors.rePassword.message}
        </Typography>
      </Grid>
    </>
  );
}
