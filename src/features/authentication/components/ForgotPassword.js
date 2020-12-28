import { Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../../utils/authentication.dao";
import { STATUS_OK } from "../../../utils/handleAPI";
import CustomButton from "../../../components/custom/CustomButton";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  labelAsterisk: {
    color: "red",
  },
}));

export default function ForgotPassword(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const notify = React.useRef(null);

  const submitForm = async (data) => {
    //handle
    const result = await forgotPassword(data.email);
    if (result.status === STATUS_OK) {
      props.exist(true);
    } else {
      notify.current.innerHTML = result.message;
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
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
        </Grid>
        <Grid item xs={12}>
          <Typography component="p" color="error" ref={notify}>
            {errors.email && "Email không đúng định dạng"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomButton color="success" fullWidth>Đăng nhập</CustomButton>
        </Grid>
      </Grid>
    </form>
  );
}
