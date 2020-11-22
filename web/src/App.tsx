import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import { HomePage, AddLocation, PatientTable, CasesList, LoginPage, CaseDetails, Settings } from "./components";

const NavBarLayout = () => {
  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />
  }

  return (
    <HomePage>
      <Switch>
        <Route exact path="/">
          <AddLocation />
        </Route>
        <Route exact path="/cases">
          <CasesList />
        </Route>
        <Route path="/case/:case_no">
          <CaseDetails />
        </Route>
        <Route exact path="/patients">
          <PatientTable />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
      </Switch>
    </HomePage>
  )
}

const LoginLayout = () => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <LoginPage />
  </div>
)

const App: FC = () => (
  <div className="App" style={{ height: "100vh" }}>
    <Router>
      <Switch>
        <Route path="/login">
          <LoginLayout />
        </Route>
        <Route path="/">
          <NavBarLayout />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
