import { Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { sendCode } from "../../../utils/authentication.dao";
import { StyledTypography } from "../css/custom.component";
import "../css/style.css";
import CustomButton from "../../../components/custom/CustomButton";

export default function VerifyAccount(props) {
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
      <form className="form" onSubmit={handleSubmit(submitCode)}>
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
                  asterisk: "labelAsterisk",
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
            <Typography className="resultAPI">
              {errors.apiResult && errors.apiResult.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomButton color="success" fullWidth>
              Đăng nhập
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
