import { useRouteMatch, Switch, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage"

export default function Authentication(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} component={HomePage} />
    </Switch>
  );
}
