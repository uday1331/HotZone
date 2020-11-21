import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { HomePage, LocationTable } from "./components";

const App: FC = () => (
  <div className="App" style={{ height: "100vh" }}>
    <Router>
      <HomePage>
        <Switch>
          <Route exact path="/">
            <LocationTable />
          </Route>
          <Route exact path="/cases">
            <p>cases</p>
          </Route>
          <Route exact path="/patients">
            <p>patients</p>
          </Route>
        </Switch>
      </HomePage>
    </Router>
  </div>
);

export default App;
