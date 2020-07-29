import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Landing from './Landing/Landing';
import Dashboard from './Dashboard/Dashboard';
import { backendServer } from './shared/constants';

class App extends Component {
  state = {
    totalTime: 0,
    started: false,
    stopped: false,
  };

  start = () => {
    this.setState({ stopped: false });
    if (this.state.started === false) {
      this.setState({
        started: true,
        interval: setInterval(() => {
          this.setState({ totalTime: this.state.totalTime + 1 });
        }, 1000),
      });
    }
  };

  stop = () => {
    clearInterval(this.state.interval);
    this.setState({ started: false, stopped: true });
  };

  submit = async () => {
    console.log('submit timer to database');
    await this.createTimer();
  };

  createTimer = async () => {
    const body = {
      timer: {
        time_length: this.state.totalTime,
      },
    };

    try {
      if (this.state.totalTime === 0) {
        throw 'Timer needs to be greater than 0';
      }

      const response = await fetch(`${backendServer}/timer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });

      const newTimer = await response.json();

      console.log(newTimer);

      this.setState({ totalTime: 0, started: false, stopped: false });
    } catch (err) {
      console.log(err);
    }
  };

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
          <ProtectedRoute exact path="/dashboard/timer" component={Dashboard} currentPage={'timer'} start={this.start} stop={this.stop} submit={this.submit} state={this.state} />
          <ProtectedRoute exact path="/dashboard/analytics" component={Dashboard} currentPage={'analytics'} />
        </Switch>
      </>
    );
  }
}

export default App;
