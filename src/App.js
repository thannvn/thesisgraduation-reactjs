import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import MenuBar from "./dataworld/blocks/menu-bar/menu-bar.component";
import PrivateRoute from "./routes/PrivateRoute";

const Authentication = React.lazy(() =>
  import("./app/modules/authentication/router")
);
const Home = React.lazy(() => import("./app/modules/home/router"));
const Introduce = React.lazy(() => import("./app/modules/introduce/router"))
const Profile = React.lazy(() => import("./app/modules/profile/router"))

function App() {
  return (
    <>
      <Suspense
        fallback={<div>Loading...</div>}
      >
        <MenuBar />
        <Switch>
          <Route path="/auth" component={Authentication} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path='/profile' component={Profile} />
          <PrivateRoute path="/" component={Introduce} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
