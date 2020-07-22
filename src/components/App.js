import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';

class App extends Component {
  render() {
    // console.log(this.props);
    return (
      <>
        <Switch>
          <Route exact path="/" component={Landing} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/dashboard/journals" component={Dashboard} />
          <ProtectedRoute exact path="/dashboard/journals/new" component={Dashboard} />
          <ProtectedRoute exact path="/dashboard/journals/:id" component={Dashboard} />
          <ProtectedRoute exact path="/dashboard/bookmarks" component={Dashboard} />
          <ProtectedRoute exact path="/dashboard/goals" component={Dashboard} />
          <ProtectedRoute exact path="/dashboard/timer" component={Dashboard} />
          <ProtectedRoute exact path="/dashboard/analytics" component={Dashboard} />
        </Switch>
      </>
    );
  }
}

export default App;
