import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import './css/style.scss'

export default function Authentication(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} component={HomePage} />
    </Switch>
  );
}
