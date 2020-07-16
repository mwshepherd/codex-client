import React, { Component } from 'react';

// Styles
import './Dashboard.scss';

// Components
import Nav from '../shared/Nav/Nav';
import TopPanel from '../shared/TopPanel/TopPanel';
import Home from '../Home/Home';
import NewJournal from '../NewJournal/NewJournal';
import Journals from '../Journals/Journals';
import Bookmarks from '../Bookmarks/Bookmarks';
import Goals from '../Goals/Goals';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'home',
      navState: 'collapsed',
      navExpanded: false,
    };

    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  setCurrentPage(page) {
    this.setState({ currentPage: page });
  }

  toggleNav() {
    if (this.state.navState === 'collapsed') {
      this.setState({ navState: 'expanded', navExpanded: true });
    } else {
      this.setState({ navState: 'collapsed', navExpanded: false });
    }
  }

  render() {
    console.log(this.state);

    const { currentPage } = this.state;
    let mainWindow;

    switch (currentPage) {
      case 'home':
        mainWindow = <Home />;
        break;
      case 'new-journal':
        mainWindow = <NewJournal />;
        break;
      case 'journals':
        mainWindow = <Journals />;
        break;
      case 'bookmarks':
        mainWindow = <Bookmarks />;
        break;
      case 'goals':
        mainWindow = <Goals />;
        break;
      default:
        mainWindow = <div>Content not found</div>;
    }

    return (
      <>
        <TopPanel toggleNav={this.toggleNav} />
        <div className="container">
          <Nav setCurrentPage={this.setCurrentPage} navState={this.state.navState} navExpanded={this.state.navExpanded} />
          <div className="main-panel">
            <div className="main-panel__container">{mainWindow}</div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
