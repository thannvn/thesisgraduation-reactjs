import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../../../routes/private-route";
import './css/style.scss';
import HomePage from "./pages/home.component";

export default function Authentication() {
  const match = useRouteMatch();

  return (
    <Switch>
      <PrivateRoute path={match.url} component={HomePage} />
    </Switch>
  );
}
