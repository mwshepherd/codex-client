import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
// Styles
import './Dashboard.scss';

// Components
import Nav from '../shared/Nav/Nav';
import TopPanel from '../shared/TopPanel/TopPanel';
import Home from '../Home/Home';
import NewJournal from '../NewJournal/NewJournal';
import EditJournal from '../EditJournal/EditJournal';
import Journals from '../Journals/Journals';
import SingleJournal from '../SingleJournal/SingleJournal';
import Bookmarks from '../Bookmarks/Bookmarks';
import Goals from '../Goals/Goals';
import DynamicComponent from '../DynamicComponent/DynamicComponent';
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

    this.toggleNav = this.toggleNav.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.setCurrentJournal = this.setCurrentJournal.bind(this);
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

  toggleNav() {
    if (this.state.navState === 'collapsed') {
      this.setState({ navState: 'expanded', navExpanded: true });
    } else {
      this.setState({ navState: 'collapsed', navExpanded: false });
    }
  }

  setCurrentPage(page) {
    this.setState({ currentPage: page });
  }

  setCurrentJournal(journal) {
    this.setState({ currentJournal: journal });
  }

  logOut() {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  render() {
    // console.log(this.props);
    const { currentPage } = this.props || 'home';
    // const { currentPage } = this.state;
    // console.log(currentPage);

    let mainWindow;

    switch (currentPage) {
      case 'home':
        mainWindow = <Home user={this.state.user} />;
        break;
      case 'new-journal':
        // mainWindow = <NewJournal user={this.state.user} />;
        mainWindow = <DynamicComponent page={'newJournal'} user={this.state.user} />;
        break;
      case 'edit-journal':
        // mainWindow = <NewJournal user={this.state.user} />;
        mainWindow = <DynamicComponent page={'editJournal'} user={this.state.user} locationProps={this.props} />;
        break;
      case 'journals':
        // mainWindow = <Journals  setCurrentPage={this.setCurrentPage} setCurrentJournal={this.setCurrentJournal} />;
        mainWindow = <DynamicComponent page={'journals'} />;
        break;
      case 'single-journal':
        // mainWindow = <SingleJournal currentJournal={this.props.location.state.currentJournal} setCurrentPage={this.setCurrentPage} />;
        mainWindow = <SingleJournal locationProps={this.props} />;
        break;
      case 'bookmarks':
        mainWindow = <DynamicComponent page={'bookmarks'} />;
        break;
      case 'goals':
        mainWindow = <DynamicComponent page={'goals'} />;
        break;
      default:
        mainWindow = <Home user={this.state.user} />;
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
