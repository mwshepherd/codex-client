import React, { Component } from 'react';

// Styles
import './Dashboard.scss';

// Components
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
          <div className="main-panel">
            <div className="main-panel__container">
              <Home />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
