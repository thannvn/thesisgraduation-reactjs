import { Grid } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AuthenticationDao from "../../../utils/authentication.dao";
import { STATUS_OK } from "../../../utils/handleAPI";
import "../css/style.css";
import Password from "./Password";
import CustomButton from "../../../components/custom/CustomButton";

export default function ResetPasswordForm(props) {
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm();
  const submitForm = async (data) => {
    //submit form register
    const result = await AuthenticationDao.resetPassword(data.password);
    if (result.status === STATUS_OK) {
      history.push({
        pathname: "/auth/login",
        state: { notify: "Đổi mật khẩu thành công", type: "success" },
      });
      localStorage.removeItem("resetPassword-token");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
        <Password register={register} watch={watch} errors={errors} />
        <Grid item xs={12}>
          <CustomButton color="success" fullWidth type="submit">
            Đổi mật khẩu
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
}
