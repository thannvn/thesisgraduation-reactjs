import { useRouteMatch, Switch, Route } from "react-router-dom";
import React from "react";
import IntroducePage from "./pages/IntroducePage"

export default function Introduce(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} component={IntroducePage} />
    </Switch>
  );
}
