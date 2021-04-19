import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Woman from "../pages/Woman";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/women/:woman+" component={Woman} />
  </Switch>
);

export default Routes;
