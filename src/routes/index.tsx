import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";

export default function Root() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}
