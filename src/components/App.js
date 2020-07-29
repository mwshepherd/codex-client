import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Landing} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} currentPage={'home'} />
          <ProtectedRoute exact path="/dashboard/journals" component={Dashboard} currentPage={'journals'} />
          <ProtectedRoute exact path="/dashboard/journals/new" component={Dashboard} currentPage={'new-journal'} />
          <ProtectedRoute exact path="/dashboard/journals/edit/:id" component={Dashboard} currentPage={'edit-journal'} />
          <ProtectedRoute exact path="/dashboard/journals/:id" component={Dashboard} currentPage={'single-journal'} />
          <ProtectedRoute exact path="/dashboard/bookmarks" component={Dashboard} currentPage={'bookmarks'} />
          <ProtectedRoute exact path="/dashboard/goals" component={Dashboard} currentPage={'goals'} />
          <ProtectedRoute exact path="/dashboard/timer" component={Dashboard} currentPage={'timer'} />
          <ProtectedRoute exact path="/dashboard/analytics" component={Dashboard} currentPage={'analytics'} />
        </Switch>
      </>
    );
  }
}

export default App;
