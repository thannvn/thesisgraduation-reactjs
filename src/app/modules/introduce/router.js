import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import IntroducePage from "./pages/introduce.component"

export default function Introduce(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} component={IntroducePage} />
    </Switch>
  );
}
