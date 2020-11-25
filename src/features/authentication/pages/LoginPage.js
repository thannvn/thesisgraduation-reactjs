import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Copyright from "../components/CopyRight";
import LoginForm from "../components/LoginForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: theme.spacing(60),
    height: theme.spacing(70),
    padding: theme.spacing(5)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}));

export default function LoginPage() {
  const classes = useStyles();
  const user = useSelector((state) => state.auth);
  return (
    <>
      {user.user !== null && <Redirect to="/" />}

      <Container component="main" maxWidth="xs" c>
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
              <Link href="#" variant="body2">
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
