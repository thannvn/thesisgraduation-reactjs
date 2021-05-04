import React from 'react'
import NotFoundPage from "dataworld/blocks/not-found-page/not-found-page";
import { Switch, useRouteMatch } from "react-router-dom";
import DefaultRoute from "routes/default-router.component";
import PrivateRoute from "../../../routes/private-route";
import ProfilePage from './pages/profile.component';

export default function ProfileRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <PrivateRoute path={`${match.url}/:username`} component={ProfilePage} />
      <DefaultRoute component={NotFoundPage} />
    </Switch>
  );
}
