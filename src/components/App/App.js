import React from "react";
import './App.css';
import { Switch as Router_Switch, Route } from "react-router-dom";
import Test from '../Test/Test';
import Dashboard from '../Dashboard/Dashboard';
import Checkout from '../Forms/Checkout';
import Landing from "../Landing/Landing";

function App() {
  return (
    <React.Fragment>
      <Router_Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/test/" component={Test} />
        <Route path="/dash/" component={Dashboard} />
        <Route path="/payroll/" component={Checkout} />
      </Router_Switch>
    </React.Fragment>
  );
}

export default App;
