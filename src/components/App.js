import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
}

export default App;
