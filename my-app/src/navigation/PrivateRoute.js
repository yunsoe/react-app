import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ isAuth, email }) => (
      <Route
        render={(props) =>
          isAuth ? (
            <Component email={email} {...props} ></Component>
          ) : (
            <Redirect to="/login" />
          )
        }
        {...rest}
      />
    )}
  </AuthContext.Consumer>
);

export default PrivateRoute;