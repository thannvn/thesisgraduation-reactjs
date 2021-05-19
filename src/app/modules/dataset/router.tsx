import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "routes/private-route";
import DatasetList from "./dataset-list/pages/dataset-list.component";
import DatasetCreate from "./dataset-create/pages/dataset-create.component"
import DatasetFilter from "./dataset-search/pages/dataset-search.component"
import DatasetView from "./dataset-view/pages/dataset-view.template"
import DefaultRoute from "routes/default-router.component";
import NotFoundPage from "dataworld/blocks/not-found-page/not-found-page";

export default function DataSetRouter() {
  const match = useRouteMatch();

  return (
    <Switch>
      <PrivateRoute path={match.url} component={DatasetList} exact />
      <PrivateRoute path={`${match.url}/create`} component={DatasetCreate} />
      <PrivateRoute path={`${match.url}/search`} component={DatasetFilter} />
      <PrivateRoute path={`${match.url}/:username/:datasetUrl`} component={DatasetView} />
      <DefaultRoute component={NotFoundPage} />
    </Switch>
  );
}
