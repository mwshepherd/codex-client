import React, { Component } from 'react';
import './TopPanel.scss';

class TopPanel extends Component {
  render() {
    return (
      <div className="top-panel">
        <div className="top-panel__nav-btn" onClick={this.props.toggleNav}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="top-panel__site-title">codex</div>

        <div className="top-panel__right">
          <div className="top-panel__settings" onClick={this.props.logOut}></div>
        </div>
      </div>
    );
  }
}

export default TopPanel;
