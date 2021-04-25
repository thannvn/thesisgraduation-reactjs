import { Route, Switch, useRouteMatch } from "react-router-dom";
import CustomRouter from "routes/custom-router.component";
import DefaultRoute from "routes/default-router.component";
import './css/style.scss';
import ForgotPasswordPage from "./pages/forgot-password.component";
import LoginPage from "./pages/login.component";
import NotFoundPage from "dataworld/blocks/not-found-page/not-found-page";
import RegisterPage from "./pages/register.component";
import ResetPasswordPage from "./pages/reset-password.component";

export default function AuthenticationRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <DefaultRoute path={`${match.url}/login`} component={LoginPage} />
      <CustomRouter path={`${match.url}/register`} component={RegisterPage} />
      <CustomRouter path={`${match.url}/forgot`} component={ForgotPasswordPage} />
      <Route path={`${match.url}/reset-password/:resetCode`} component={ResetPasswordPage} />
      <DefaultRoute component={NotFoundPage} />
    </Switch>
  );
}
