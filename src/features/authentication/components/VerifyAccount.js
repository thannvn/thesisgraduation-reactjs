import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { useForm } from "react-hook-form";
import { sendCode } from "../../../utils/authentication.dao";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    marginBottom: theme.spacing(3),
    background: "#2ea44f",
    color: "white",
    '&:hover': {
      backgroundColor: "#2ea44f",
    }
  },
  labelAsterisk: {
    color: "red",
  },
  typography: {
    fontStyle: "italic",
  },
}));

export default function VerifyAccount(props) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [success, setSuccess] = React.useState(false);
  const notify = React.useRef(null);
  //submit verify code
  const submitCode = async (data) => {
    const result = await sendCode(data.code, props.account);
    if (result.status === 200) {
      setSuccess(true);
    } else {
      notify.current.innerHTML = result.message;
    }
  };
  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(submitCode)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.typography}>
              Kiểm tra email và nhập mã xác nhận:
            </Typography>
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
            <Typography ref={notify} variant="h6" color="error">
            </Typography>
            {success && <Alert severity="success">Đăng ký thành công</Alert>}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Xác nhận
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
