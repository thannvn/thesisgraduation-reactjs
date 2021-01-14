import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./routes/PrivateRoute";
const Authentication = React.lazy(() =>
  import("./features/authentication/router")
);
const Home = React.lazy(() => import("./features/home/router"));
const Introduce = React.lazy(() => import("./features/introduce/router"))

function App() {
  return (
    <>
      <Suspense
        fallback={null}
      >
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
