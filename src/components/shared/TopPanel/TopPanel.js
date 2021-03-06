import React, { Component } from 'react';
import './TopPanel.scss';

class TopPanel extends Component {
  render() {
    return (
      <div className="top-panel">
        <div className="top-panel__nav-btn-wrapper" onClick={this.props.toggleNav}>
          <button className="top-panel__nav-btn">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </button>
        </div>
        <div className="top-panel__site-title">codex</div>

        <div className="top-panel__right">
          <div className="top-panel__settings" onClick={this.props.logOut}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default TopPanel;
