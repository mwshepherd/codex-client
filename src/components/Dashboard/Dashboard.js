import React, { Component } from 'react';

// Styles
import './Dashboard.scss';

// Components
import Nav from '../shared/Nav/Nav';
import TopPanel from '../shared/TopPanel/TopPanel';
import Home from '../Home/Home';
import NewJournal from '../NewJournal/NewJournal';
import Journals from '../Journals/Journals';
import SingleJournal from '../SingleJournal/SingleJournal';
import Bookmarks from '../Bookmarks/Bookmarks';
import Goals from '../Goals/Goals';
import { backendServer } from '../shared/constants';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      currentPage: 'home',
      navState: 'collapsed',
      navExpanded: false,
      currentJournal: [],
    };

    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.setCurrentJournal = this.setCurrentJournal.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async componentDidMount() {
    await this.getCurrentUser();
  }

  async getCurrentUser() {
    const response = await fetch(`${backendServer}/current-user?type=json`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.json();
    this.setState({ user: data.user });
  }

  setCurrentPage(page) {
    this.setState({ currentPage: page });
  }

  setCurrentJournal(journal) {
    this.setState({ currentJournal: journal });
  }

  toggleNav() {
    if (this.state.navState === 'collapsed') {
      this.setState({ navState: 'expanded', navExpanded: true });
    } else {
      this.setState({ navState: 'collapsed', navExpanded: false });
    }
  }

  logOut() {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  render() {
    console.log(this.state);

    const { currentPage } = this.state;
    let mainWindow;

    switch (currentPage) {
      case 'home':
        mainWindow = <Home user={this.state.user} />;
        break;
      case 'new-journal':
        mainWindow = <NewJournal />;
        break;
      case 'journals':
        mainWindow = <Journals setCurrentPage={this.setCurrentPage} setCurrentJournal={this.setCurrentJournal} />;
        break;
      case 'single-journal':
        mainWindow = <SingleJournal currentJournal={this.state.currentJournal} setCurrentPage={this.setCurrentPage} />;
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
        <TopPanel toggleNav={this.toggleNav} logOut={this.logOut} />
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
