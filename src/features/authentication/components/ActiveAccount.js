import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const sendCode = async (data) => {};
  return (
    <form className={classes.form} onSubmit={handleSubmit(sendCode)}>
      <Typography>Nhập Mã kích hoạt: </Typography>
      <Link>Gửi lại</Link>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="verifyCode"
        label="Mã kích hoạt"
        name="verifyCode"
        autoFocus
        required
        inputRef={register}
      ></TextField>
      <Typography variant="h6" component="h1" color="error">
        {errors && "Mã kích hoạt sai"}
      </Typography>
      <Button className={classes.submit}>Xác nhận</Button>
    </form>
  );
}
