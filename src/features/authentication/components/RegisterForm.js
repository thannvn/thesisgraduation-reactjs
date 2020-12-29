import { Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import AuthenticationDao from "../../../utils/authentication.dao";
import { STATUS_OK } from "../../../utils/handleAPI";
import { StyledValidate } from "../css/custom.component";
import Password from "./Password";
import CustomButton from "../../../components/custom/CustomButton";

export default function RegisterForm(props) {
  const { register, handleSubmit, errors, watch, setError } = useForm();
  const submitForm = async (data) => {
    //submit form register
    const result = await AuthenticationDao.registerAccount(data);
    if (result.status === STATUS_OK) {
      props.setId(result.message);
    } else {
      //handle
      setError("apiResult", { message: result.message });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={3}>
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
                asterisk: "labelAsterisk",
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
                asterisk: "labelAsterisk",
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
                asterisk: "labelAsterisk",
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
          <StyledValidate>
            {errors.email && "Email không đúng định dạng"}
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
                asterisk: "labelAsterisk",
              },
            }}
            id="username"
            label="Tên đăng nhập"
            name="username"
            inputRef={register({
              pattern: {
                value: /^(?=.{6,}$)(?![_.@])(?!.*[_.]{2})[a-zA-Z0-9._@]+(?<![_.@])$/,
              },
            })}
          />
          <StyledValidate>
            {errors.username &&
              "Tên tài khoản lớn hơn 6 ký tự, không sử dụng các ký tự đặc biệt, có thể sử dụng [@ . _]"}
          </StyledValidate>
        </Grid>

        <Password register={register} watch={watch} errors={errors} />
        <Grid item xs={12}>
          <Typography className="resultAPI">
            {errors.apiResult && errors.apiResult.message}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButton color="success" fullWidth type="submit">
            Đăng ký
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
}
