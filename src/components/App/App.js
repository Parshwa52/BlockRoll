import React from "react";
import "./App.css";
import { Switch as Router_Switch, Route } from "react-router-dom";
import Test from "../Test/Test";
import Dashboard from "../Dashboard/Dashboard";
import Checkout from "../Forms/Checkout";
import Landing from "../Landing/Landing";
import DirectSend from "../DirectForm/Checkout";

function App() {
    return (
        <React.Fragment>
            <Router_Switch>
                <Route path="/" component={Landing} exact />
                <Route path="/test/" component={Test} />
                <Route path="/dash/" component={Dashboard} />
                <Route path="/payroll/" component={Checkout} />
                <Route path="/send/" component={DirectSend} />
            </Router_Switch>
        </React.Fragment>
    );
}

export default App;
