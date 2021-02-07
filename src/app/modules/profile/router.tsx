import { Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../../../routes/PrivateRoute";
import './css/style.scss';
import ProfilePage from './pages/profile.component';

export default function ProfileRoute() {
  const match = useRouteMatch();
  return (
    <Switch>
      <PrivateRoute path={match.url} component={ProfilePage} />
    </Switch>
  );
}
