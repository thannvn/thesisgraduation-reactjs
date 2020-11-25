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
import RegisterForm from "../components/RegisterForm";
import React from "react";
import Copyright from "../components/CopyRight";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: theme.spacing(60),
    height: theme.spacing(70),
    padding: theme.spacing(5),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Register() {
  const classes = useStyles();
  //check register in step 1 or 2
  const [correctInfo, setCorrectInfo] = React.useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper variant="outlined" className={classes.paper}>
        {correctInfo === false ? (
          <>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Tạo tài khoản
            </Typography>
            <RegisterForm />
            <Grid container justify="flex-end">
              <Grid item>
                Bạn đã có tài khoản?{" "}
                <Link href="/auth/login" variant="body2">
                  Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </>
        ) : null}
      </Paper>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
