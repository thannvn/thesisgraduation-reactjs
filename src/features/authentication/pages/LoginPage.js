import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Notification from "../../../components/Notification";
import Copyright from "../components/CopyRight";
import LoginForm from "../components/LoginForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: theme.spacing(60),
    height: "auto",
    padding: theme.spacing(5),
    background: "#F7F7F7",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function LoginPage(props) {
  const notify = props.location.state ? props.location.state.notify : undefined;
  const type = props.location.state ? props.location.state.type : undefined;

  const classes = useStyles();
  const user = useSelector((state) => state.auth);
  return (
    <>
      {user.user !== null && <Redirect to="/" />}
      {notify && <Notification notify={notify} type={type} />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper variant="outlined" className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <LoginForm></LoginForm>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/forgot" variant="body2">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              Bạn chưa có tài khoản?{" "}
              <Link href="/auth/register" variant="body2">
                Đăng ký
              </Link>
            </Grid>
          </Grid>
        </Paper>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
