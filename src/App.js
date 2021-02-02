import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import MenuBar from "./dataworld/blocks/menu-bar/menu-bar.component";
import PrivateRoute from "./routes/PrivateRoute";

const Authentication = React.lazy(() =>
  import("./app/modules/authentication/router")
);
const Home = React.lazy(() => import("./app/modules/home/router"));
const Introduce = React.lazy(() => import("./app/modules/introduce/router"))

function App() {
  return (
    <>
      <Suspense
        fallback={null}
      >
        <MenuBar />
        <Switch>
          <Route path="/auth" component={Authentication} />
          <PrivateRoute path="/home" component={Home} />
          <Route path="/" component={Introduce}></Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
