import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import HomePage from "../pages/HomePage";
import GeneratePage from "../pages/GeneratePage";
import LetterPage from "../pages/LetterPage";

export default function Root() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/generate" exact component={GeneratePage} />
        <Route path="/letter" exact component={LetterPage} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}
