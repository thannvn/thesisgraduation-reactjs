import LoadingPage from "dataworld/blocks/loading/loading-page.component";
import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import MenuBar from "./dataworld/blocks/menu-bar/menu-bar.component";
import DefaultRoute from "./routes/default-router.component";

const Authentication = React.lazy(() =>
  import("./app/modules/authentication/router")
);
const Home = React.lazy(() => import("app/modules/home/router"));
const Introduce = React.lazy(() => import("app/modules/introduce/router"))
const Profile = React.lazy(() => import("app/modules/profile/router"))
const DataSet = React.lazy(() => import("app/modules/dataset/router"))
const NotFound = React.lazy(() => import("dataworld/blocks/not-found-page/not-found-page"))

function App() {
  return (
    <>
      <Suspense
        fallback={<LoadingPage />}
      >
        <MenuBar />
        <Switch>
          <Route path="/auth" component={Authentication} />
          <Route path="/home" component={Home} />
          <Route path='/profile' component={Profile} />
          <DefaultRoute path="/" component={Introduce} exact={true} />
          <Route path='/dataset' component={DataSet} />
          <DefaultRoute path='/404' component={NotFound} />
          <DefaultRoute component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
