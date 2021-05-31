import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard"
function Routes(props) {
    return (
        <Router>
            <Route
            path="/:userId/:testId"
            exact
            component={Login}
            />
        </Router>
    );
}

export default Routes;