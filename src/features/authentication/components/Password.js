import { Grid, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { StyledValidate } from "../css/custom.component";

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
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{6,}$/,
            },
          })}
        />
        <StyledValidate>
          {errors.password &&
            "Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất 1 ký tự là số và 1 ký tự đặc biệt [@, $, !, %, *, #, ?, &, .]"}
        </StyledValidate>
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
        <StyledValidate>
          {errors.rePassword && errors.rePassword.message}
        </StyledValidate>
      </Grid>
    </>
  );
}
