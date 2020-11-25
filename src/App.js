import "./App.css";
import { Route, Switch } from "react-router-dom";
import React from "react";
import { Suspense } from "react";
import PrivateRoute from "./routes/PrivateRoute";

const Authentication = React.lazy(() =>
  import("./features/authentication/router")
);
const Home = React.lazy(() => import("./features/home/router"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/auth" component={Authentication} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
