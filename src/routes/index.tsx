import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import HomePage from "../pages/HomePage";
import GeneratePage from "../pages/GeneratePage";

export default function Root() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/generate" exact component={GeneratePage} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}
