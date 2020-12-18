import { useRouteMatch, Switch, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"

export default function Authentication(props) {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/login`} component={LoginPage} />
      <Route path={`${match.url}/register`} component={RegisterPage} />
      <Route path={`${match.url}/forgot`} component={ForgotPasswordPage} />
      <Route path={`${match.url}/reset-password/:resetCode`} component={ResetPasswordPage} />
    </Switch>
  );
}
