import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './Landing/Landing';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </>
  );
}

export default App;
