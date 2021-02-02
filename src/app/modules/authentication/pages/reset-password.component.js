import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography
} from "@material-ui/core";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import addToast from "../../../../dataworld/parts/toast/add-toast.component";
import AuthenticationDao from "../../../../api/authentication-api";
import { STATUS_OK } from "../../../const/status-api.const";
import Copyright from "../../../../dataworld/parts/copy-right/copy-right.component";
import ResetPasswordForm from "../components/reset-password-form.component";
import { StyledPaper } from "../css/custom.component";

export default function ResetPasswordPage() {
  const { resetCode } = useParams();
  const [isValidToken, setValidToken] = React.useState(false);
  const history = useHistory();
  localStorage.setItem("resetPassword-token", resetCode);

  React.useEffect(() => {
    const validateResetCode = async () => {
      const result = await AuthenticationDao.resetPassword();
      if (result.status === STATUS_OK) {
        setValidToken(true);
      } else {
        addToast({message: "Link không đúng", type: "error"})
        history.push({
          pathname: "/auth/login",
        });
        localStorage.removeItem("resetPassword-token");
      }
    };
    validateResetCode();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isValidToken && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <StyledPaper variant="outlined">
            <Avatar className='avatar' src={process.env.PUBLIC_URL + '/images/reset-password'}></Avatar>
            <Typography component="h1" variant="h5">
              Đổi mật khẩu
            </Typography>
            <ResetPasswordForm />
            <Grid container justify="flex-end">
              <Grid item>
                Bạn đã có tài khoản?{" "}
                <Link href="/auth/login" variant="body2">
                  Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </StyledPaper>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )}
    </>
  );
}
