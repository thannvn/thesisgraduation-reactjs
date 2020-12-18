import { Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import Password from "./Password";
import { resetPassword } from "../../../utils/authentication.dao";
import { STATUS_OK } from "../../../utils/handleAPI";
import { useHistory } from "react-router-dom";

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

export default function ResetPasswordForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit, errors, watch, setError } = useForm();
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
    <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
        <Password register={register} watch={watch} errors={errors} />
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Xác nhận
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
