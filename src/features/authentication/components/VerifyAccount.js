import { Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { BUTTON_LOGIN } from "../../../css/color";
import { sendCode } from "../../../utils/authentication.dao";
import { StyledButton, StyledTypography } from "../css/custom.component";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  labelAsterisk: {
    color: "red",
  },
}));

export default function VerifyAccount(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors, setError } = useForm();
  const history = useHistory();
  //submit verify code
  const submitCode = async (data) => {
    const result = await sendCode(data.code, props.account);
    if (result.status === 200) {
      history.push({
        pathname: "/auth/login",
        state: {
          notify: "Đăng ký thành công",
          type: "success",
        },
      });
    } else {
      setError("apiResult", { message: result.message });
    }
  };
  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(submitCode)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledTypography>
              Kiểm tra email và nhập mã xác nhận:
            </StyledTypography>
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
              id="code"
              label="Mã kích hoạt"
              name="code"
              autoFocus
              required
              inputRef={register}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              {errors.apiResult && errors.apiResult.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <StyledButton
              color={BUTTON_LOGIN}
              type="submit"
              fullWidth
              variant="contained"
            >
              Xác nhận
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
