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
              <div className="icon">
                <i className="far fa-edit"></i>
              </div>
              <div className={navExpanded ? `nav-link show` : `nav-link`}>Journal</div>
            </li>
            <li onClick={() => this.props.setCurrentPage('bookmarks')}>
              <div className="nav-link">Bookmarks</div>
            </li>
            <li onClick={() => this.props.setCurrentPage('goals')}>
              <div className="nav-link">New Goal</div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
