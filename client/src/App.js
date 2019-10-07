import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
