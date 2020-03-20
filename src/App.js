import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './dashboard';
import AffectedCountries from './AffectedCountries';
import { Switch, Route, Redirect } from 'react-router';
import CountryDetails from './CountryDetails';

function App() {
  return (
    <div className="row m-0">
      <div className="col-md-4 col-lg-2">
        <AffectedCountries />
      </div>
      <div className="col-md-8 col-lg-8">
        <Switch>
          <Redirect from="/" to="/dashboard" exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/details/:country" component={CountryDetails} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
