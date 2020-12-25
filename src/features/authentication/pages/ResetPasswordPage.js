import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import img from "../../../assets/images/reset-password.png";
import { resetPassword } from "../../../utils/authentication.dao";
import { STATUS_OK } from "../../../utils/handleAPI";
import Copyright from "../components/CopyRight";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { StyledPaper } from "../css/custom.component";

export default function ResetPasswordPage() {
  const { resetCode } = useParams();
  const [isValidToken, setValidToken] = React.useState(false);
  const history = useHistory();
  localStorage.setItem("resetPassword-token", resetCode);

  React.useEffect(() => {
    const validateResetCode = async () => {
      const result = await resetPassword();
      if (result.status === STATUS_OK) {
        setValidToken(true);
      } else {
        history.push({
          pathname: "/auth/login",
          state: { notify: "Link không đúng", type: "error" },
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
            <Avatar className='avatar' src={img}></Avatar>
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
