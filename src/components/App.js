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
          <ProtectedRoute exact path="/dashboard" component={Dashboard} currentPage={'home'} />
          <ProtectedRoute exact path="/dashboard/journals" component={Dashboard} currentPage={'journals'} />
          <ProtectedRoute exact path="/dashboard/journals/new" component={Dashboard} currentPage={'new-journal'} />
          <ProtectedRoute exact path="/dashboard/journals/:id" component={Dashboard} currentPage={'single-journal'} />
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
