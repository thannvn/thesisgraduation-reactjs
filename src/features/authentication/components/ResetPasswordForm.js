import { Grid } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { BUTTON_LOGIN } from "../../../css/color";
import { resetPassword } from "../../../utils/authentication.dao";
import { STATUS_OK } from "../../../utils/handleAPI";
import { StyledButton } from "../css/custom.component";
import "../css/style.css";
import Password from "./Password";

export default function ResetPasswordForm(props) {
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm();
  const submitForm = async (data) => {
    //submit form register
    const result = await resetPassword(data.newPassword);
    if (result.status === STATUS_OK) {
      history.push({
        pathname: "/auth/login",
        state: { notify: "Đổi mật khẩu thành công", type: "success" },
      });
      localStorage.removeItem("resetPassword-token");
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
        <Password register={register} watch={watch} errors={errors} />
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
