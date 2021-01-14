import {
  Avatar,
  Box,
  Container,
  Grid,
  Link,
  Typography,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Notification from "../../../components/Notification";
import Copyright from "../components/CopyRight";
import LoginFacebook from "../components/LoginFacebook";
import LoginForm from "../components/LoginForm";
import LoginGoogle from "../components/LoginGoogle";
import { StyledPaper } from "../css/custom.component";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/style.css";
toast.configure()

const useStyles = makeStyles((theme) => ({
  oauth: {
    margin: "20px 0px 20px 0px",
  },
  facebook: {
    width: "200px",
    fontSize: "14px !important",
    height: "43px",
  },
}));

export default function LoginPage(props) {
  const classes = useStyles();
  const notify = props.location.state ? props.location.state.notify : undefined;
  const type = props.location.state ? props.location.state.type : undefined;
  const user = useSelector((state) => state.auth);
  return (
    <>
      {user.user !== null && <Redirect to="/home" />}
      {notify && <Notification notify={notify} type={type} />}
      <Container component="main" className="main">
        <StyledPaper variant="outlined">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <LoginForm />
          <LoginFacebook />
          <LoginGoogle className={classes.oauth} />
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
        </StyledPaper>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
