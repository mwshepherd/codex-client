import React, { Component } from 'react';
// Styles
import './Dashboard.scss';

// Components
import Nav from '../shared/Nav/Nav';
import TopPanel from '../shared/TopPanel/TopPanel';
import SingleJournal from '../SingleJournal/SingleJournal';
import Timer from '../Timer/Timer';
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
      // bookmarkPopUp: false,
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

  // toggleBookmarkPopUp = () => {
  //   this.setState({ bookmarkPopUp: true });
  // };

  logOut() {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  render() {
    const { currentPage } = this.props || 'home';

    let mainWindow;

    switch (currentPage) {
      case 'home':
        // mainWindow = <Home user={this.state.user} />;
        mainWindow = <DynamicComponent page={'home'} user={this.state.user} />;
        break;
      case 'new-journal':
        mainWindow = <DynamicComponent page={'newJournal'} user={this.state.user} />;
        break;
      case 'edit-journal':
        // mainWindow = <NewJournal user={this.state.user} />;
        mainWindow = <DynamicComponent page={'editJournal'} user={this.state.user} locationProps={this.props} />;
        break;
      case 'journals':
        mainWindow = <DynamicComponent page={'journals'} />;
        break;
      case 'single-journal':
        mainWindow = <SingleJournal locationProps={this.props} />;
        break;
      case 'bookmarks':
        mainWindow = <DynamicComponent page={'bookmarks'} />;
        break;
      case 'goals':
        mainWindow = <DynamicComponent page={'goals'} />;
        break;
      case 'timer':
        mainWindow = (
          <Timer
            start={this.props.start}
            stop={this.props.stop}
            submit={this.props.submit}
            state={this.props.state}
            timerErrorMessage={this.props.timerErrorMessage}
          />
        );
        break;
      case 'analytics':
        mainWindow = <DynamicComponent page={'analytics'} user={this.state.user} />;
        break;
      default:
        mainWindow = <div>Not found</div>;
    }

    return (
      <>
        <TopPanel toggleNav={this.toggleNav} logOut={this.logOut} />
        <div className="container">
          <Nav
            setCurrentPage={this.setCurrentPage}
            navState={this.state.navState}
            navExpanded={this.state.navExpanded}
            toggleBookmarkPopUp={this.toggleBookmarkPopUp}
          />
          <div className="main-panel">
            <div className="main-panel__container">{mainWindow}</div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
