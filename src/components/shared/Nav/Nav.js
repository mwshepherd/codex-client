import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import './Nav.scss';

class Nav extends Component {
  render() {
    let { navExpanded } = this.props;
    return (
      <div className={`left-panel ${this.props.navState}`}>
        <nav className="nav-main">
          <ul className="quick-links">
            <Link
              to={{
                pathname: '/dashboard/journals/new',
                state: { currentPage: 'new-journal' },
              }}
              className="nav-quick-link"
            >
              <Tooltip
                title="New Journal"
                position="right-bottom"
                trigger="mouseenter"
                style={{ display: 'block' }}
                arrow="true"
                theme="light"
                disabled={navExpanded ? true : false}
              >
                <li>
                  <div className="link-wrapper">
                    <div className="icon">
                      <i className="far fa-edit"></i>
                    </div>
                    <div className={navExpanded ? `nav-link show` : `nav-link`}>New Journal</div>
                  </div>
                </li>
              </Tooltip>
            </Link>
            <Link to="/dashboard/bookmarks" className="nav-quick-link">
              <Tooltip
                title="New Bookmark"
                position="right-bottom"
                trigger="mouseenter"
                style={{ display: 'block' }}
                arrow="true"
                theme="light"
                disabled={navExpanded ? true : false}
              >
                <li>
                  <div className="link-wrapper">
                    <div className="icon">
                      <i className="far fa-bookmark"></i>
                    </div>
                    <div className={navExpanded ? `nav-link show` : `nav-link`}>New Bookmark</div>
                  </div>
                </li>
              </Tooltip>
            </Link>
            <Link
              to={{
                pathname: '/dashboard/goals',
                state: { currentPage: 'goals' },
              }}
              className="nav-quick-link"
            >
              <Tooltip
                title="New Goal"
                position="right-bottom"
                trigger="mouseenter"
                style={{ display: 'block' }}
                arrow="true"
                theme="light"
                disabled={navExpanded ? true : false}
              >
                <li onClick={() => this.props.setCurrentPage('goals')}>
                  <div className="link-wrapper">
                    <div className="icon">
                      <i className="far fa-calendar-check"></i>
                    </div>
                    <div className={navExpanded ? `nav-link show` : `nav-link`}>New Goal</div>
                  </div>
                </li>
              </Tooltip>
            </Link>
          </ul>

          <ul className="regular-links">
            <Link
              to={{ pathname: '/dashboard', state: { currentPage: 'home' } }}
              className="nav-link-icon"
              arrow="true"
            >
              <Tooltip
                title="Home"
                position="right-bottom"
                trigger="mouseenter"
                style={{ display: 'block' }}
                arrow="true"
                theme="light"
                disabled={navExpanded ? true : false}
              >
                <li>
                  <div className="link-wrapper">
                    <div className="icon">
                      <i className="fas fa-home"></i>
                    </div>
                    <div className={navExpanded ? `nav-link show` : `nav-link`}>Home</div>
                  </div>
                </li>
              </Tooltip>
            </Link>
            <Link
              to={{
                pathname: '/dashboard/journals',
                state: { currentPage: 'journals' },
              }}
              className="nav-link-icon"
            >
              <Tooltip
                title="Journals"
                position="right-bottom"
                trigger="mouseenter"
                style={{ display: 'block' }}
                arrow="true"
                theme="light"
                disabled={navExpanded ? true : false}
              >
                <li>
                  <div className="link-wrapper">
                    <div className="icon">
                      <i className="fas fa-book"></i>
                    </div>
                    <div className={navExpanded ? `nav-link show` : `nav-link`}>Journals</div>
                  </div>
                </li>
              </Tooltip>
            </Link>
            <Link
              to={{
                pathname: '/dashboard/bookmarks',
                state: { currentPage: 'bookmarks' },
              }}
              className="nav-link-icon"
            >
              <Tooltip
                title="Bookmarks"
                position="right-bottom"
                trigger="mouseenter"
                style={{ display: 'block' }}
                arrow="true"
                theme="light"
                disabled={navExpanded ? true : false}
              >
                <li>
                  <div className="link-wrapper">
                    <div className="icon">
                      <i className="fas fa-link"></i>
                    </div>
                    <div className={navExpanded ? `nav-link show` : `nav-link`}>Bookmarks</div>
                  </div>
                </li>
              </Tooltip>
            </Link>
            <Link
              to={{
                pathname: '/dashboard/goals',
                state: { currentPage: 'goals' },
              }}
              className="nav-link-icon"
            >
              <Tooltip
                title="Goals"
                position="right-bottom"
                trigger="mouseenter"
                style={{ display: 'block' }}
                arrow="true"
                theme="light"
                disabled={navExpanded ? true : false}
              >
                <li onClick={() => this.props.setCurrentPage('goals')}>
                  <div className="link-wrapper">
                    <div className="icon">
                      <i className="fas fa-clipboard-list"></i>
                    </div>
                    <div className={navExpanded ? `nav-link show` : `nav-link`}>Goals</div>
                  </div>
                </li>
              </Tooltip>
            </Link>
            <Link
              to={{
                pathname: '/dashboard/timer',
                state: { currentPage: 'timer' },
              }}
              className="nav-link-icon"
            >
              <Tooltip
                title="Timer"
                position="right-bottom"
                trigger="mouseenter"
                style={{ display: 'block' }}
                arrow="true"
                theme="light"
                disabled={navExpanded ? true : false}
              >
                <li onClick={() => this.props.setCurrentPage('timer')}>
                  <div className="link-wrapper">
                    <div className="icon">
                      <i className="far fa-clock"></i>
                    </div>
                    <div className={navExpanded ? `nav-link show` : `nav-link`}>Timer</div>
                  </div>
                </li>
              </Tooltip>
            </Link>
            <Link
              to={{
                pathname: '/dashboard/analytics',
                state: { currentPage: 'analytics' },
              }}
              className="nav-link-icon"
            >
              <Tooltip
                title="Analytics"
                position="right-bottom"
                trigger="mouseenter"
                style={{ display: 'block' }}
                arrow="true"
                theme="light"
                disabled={navExpanded ? true : false}
              >
                <li onClick={() => this.props.setCurrentPage('analytics')}>
                  <div className="link-wrapper">
                    <div className="icon">
                      <i className="far fa-chart-bar"></i>
                    </div>
                    <div className={navExpanded ? `nav-link show` : `nav-link`}>Analytics</div>
                  </div>
                </li>
              </Tooltip>
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
