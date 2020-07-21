import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

class Nav extends Component {
  render() {
    let { navExpanded } = this.props;
    return (
      <div className={`left-panel ${this.props.navState}`}>
        <nav className="nav-main">
          <ul className="quick-links">
            <Link to={{ pathname: '/dashboard/journals/new', state: { currentPage: 'new-journal' } }}>
              <li>
                <div className="link-wrapper">
                  <div className="icon">
                    <i className="far fa-edit"></i>
                  </div>
                  <div className={navExpanded ? `nav-link show` : `nav-link`}>New Journal</div>
                </div>
              </li>
            </Link>
            <Link to={{ pathname: '/dashboard/bookmarks', state: { currentPage: 'bookmarks' } }}>
              <li>
                <div className="link-wrapper">
                  <div className="icon">
                    <i className="far fa-bookmark"></i>
                  </div>
                  <div className={navExpanded ? `nav-link show` : `nav-link`}>New Bookmark</div>
                </div>
              </li>
            </Link>
            <Link to={{ pathname: '/dashboard/bookmarks', state: { currentPage: 'goals' } }}>
              <li onClick={() => this.props.setCurrentPage('goals')}>
                <div className="link-wrapper">
                  <div className="icon">
                    <i className="far fa-calendar-check"></i>
                  </div>
                  <div className={navExpanded ? `nav-link show` : `nav-link`}>New Goal</div>
                </div>
              </li>
            </Link>
          </ul>

          <ul className="regular-links">
            <Link to={{ pathname: '/dashboard', state: { currentPage: 'home' } }}>
              <li>
                <div className="link-wrapper">
                  <div className="icon">
                    <i className="fas fa-home"></i>
                  </div>
                  <div className={navExpanded ? `nav-link show` : `nav-link`}>Home</div>
                </div>
              </li>
            </Link>
            <Link to={{ pathname: '/dashboard/journals', state: { currentPage: 'journals' } }}>
              <li>
                <div className="link-wrapper">
                  <div className="icon">
                    <i className="fas fa-book"></i>
                  </div>
                  <div className={navExpanded ? `nav-link show` : `nav-link`}>Journals</div>
                </div>
              </li>
            </Link>
            <Link to={{ pathname: '/dashboard/bookmarks', state: { currentPage: 'bookmarks' } }}>
              <li>
                <div className="link-wrapper">
                  <div className="icon">
                    <i className="fas fa-link"></i>
                  </div>
                  <div className={navExpanded ? `nav-link show` : `nav-link`}>Bookmarks</div>
                </div>
              </li>
            </Link>
            <Link to={{ pathname: '/dashboard/goals', state: { currentPage: 'goals' } }}>
              <li onClick={() => this.props.setCurrentPage('goals')}>
                <div className="link-wrapper">
                  <div className="icon">
                    <i className="fas fa-clipboard-list"></i>
                  </div>
                  <div className={navExpanded ? `nav-link show` : `nav-link`}>Goals</div>
                </div>
              </li>
            </Link>
            <Link to={{ pathname: '/dashboard/timer', state: { currentPage: 'timer' } }}>
              <li onClick={() => this.props.setCurrentPage('timer')}>
                <div className="link-wrapper">
                  <div className="icon">
                    <i className="far fa-clock"></i>
                  </div>
                  <div className={navExpanded ? `nav-link show` : `nav-link`}>Timer</div>
                </div>
              </li>
            </Link>
            <Link to={{ pathname: '/dashboard/analytics', state: { currentPage: 'analytics' } }}>
              <li onClick={() => this.props.setCurrentPage('analytics')}>
                <div className="link-wrapper">
                  <div className="icon">
                    <i className="far fa-chart-bar"></i>
                  </div>
                  <div className={navExpanded ? `nav-link show` : `nav-link`}>Analytics</div>
                </div>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
