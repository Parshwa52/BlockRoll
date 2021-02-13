import React from "react";
import './App.css';
import { Switch as Router_Switch, Route } from "react-router-dom";
import Test from '../Test/Test';
import Payroll from '../Payroll/Payroll';
import Dashboard from '../Dashboard/Dashboard';

function App() {
  return (
    <React.Fragment>
      <Router_Switch>
        <Route path="/" component={Payroll} exact />
        <Route path="/test/" component={Test} />
        <Route path="/dash/" component={Dashboard} />
      </Router_Switch>
    </React.Fragment>
  );
}

export default App;
