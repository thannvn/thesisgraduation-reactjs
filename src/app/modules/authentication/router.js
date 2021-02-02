import { useRouteMatch, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/login.component";
import RegisterPage from "./pages/register.component";
import ForgotPasswordPage from "./pages/forgot-password.component"
import ResetPasswordPage from "./pages/reset-password.component"
import './css/style.scss'

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
