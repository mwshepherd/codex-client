import React, { Component } from 'react';
import Nav from '../shared/Nav/Nav';
import TopPanel from '../shared/TopPanel/TopPanel';
import Home from '../Home/Home';

class Dashboard extends Component {
  render() {
    return (
      <>
        <TopPanel />
        <div className="container">
          <Nav />
          <Home />
        </div>
      </>
    );
  }
}

export default Dashboard;
