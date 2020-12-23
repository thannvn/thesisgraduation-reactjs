import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  makeStyles,
  Grid,
  Link,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import Copyright from "../components/CopyRight";
import ForgotPassword from "../components/ForgotPassword";
import img from "../../../images/forgot-password.png";
import { StyledPaper, StyledTypography } from "../css/custom.component";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    background: "#F7F7F7",
  },
  link: {
    fontWeight: "bold",
    color: "#434343",
  },
}));

export default function ForgotPasswordPage() {
  const classes = useStyles();
  const [isExistEmail, setExistEmail] = React.useState(false);
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <StyledPaper variant="outlined">
          <Avatar className={classes.avatar} src={img}></Avatar>
          <Typography component="h1" variant="h5">
            Quên mật khẩu
          </Typography>
          {!isExistEmail ? (
            <>
              <StyledTypography >
                Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
              </StyledTypography>

              <ForgotPassword exist={setExistEmail} />
              <Grid container justify="flex-end">
                <Grid item>
                  Bạn đã có tài khoản?{" "}
                  <Link href="/auth/login" variant="body2">
                    Đăng nhập
                  </Link>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <StyledTypography >
                Chúng tôi đã gửi link đặt lại mật khẩu qua email của bạn. Nếu
                không thấy mail trong vài phút, hãy kiểm tra hộp thư spam
              </StyledTypography>

              <Button variant="contained" className={classes.button}>
                <Link
                  href="/auth/login"
                  variant="body2"
                  className={classes.link}
                >
                  Quay lại đăng nhập
                </Link>
              </Button>
            </>
          )}
        </StyledPaper>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
