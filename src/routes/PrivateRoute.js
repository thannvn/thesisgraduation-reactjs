import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const login = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      render={(props) =>
        login.user !== null ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/auth/login"></Redirect>
        )
      }
    />
  );
}

export default PrivateRoute;
