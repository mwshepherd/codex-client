import React, { Component } from 'react';
import './Nav.scss';

class Nav extends Component {
  render() {
    let { navExpanded } = this.props;
    return (
      <div className={`left-panel ${this.props.navState}`}>
        <nav className="nav-main">
          <ul>
            <li onClick={() => this.props.setCurrentPage('new-journal')}>
              <div className="link-wrapper">
                <div className="icon">
                  <i className="far fa-edit"></i>
                </div>
                <div className={navExpanded ? `nav-link show` : `nav-link`}>New Journal</div>
              </div>
            </li>
            <li onClick={() => this.props.setCurrentPage('bookmarks')}>
              <div className="link-wrapper">
                <div className="icon">
                  <i className="far fa-bookmark"></i>
                </div>
                <div className={navExpanded ? `nav-link show` : `nav-link`}>New Bookmark</div>
              </div>
            </li>
            <li onClick={() => this.props.setCurrentPage('goals')}>
              <div className="link-wrapper">
                <div className="icon">
                  <i className="far fa-calendar-check"></i>
                </div>
                <div className={navExpanded ? `nav-link show` : `nav-link`}>New Goal</div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
