import React, { Component } from 'react';
import moment from 'moment';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import './Timer.scss';

export default class Timer extends Component {
  render() {
    return (
      <>
        <div className="page-header">
          <h1>Timer</h1>
        </div>
        <div className="timer">
          <div className="timer__wrapper">
            <div className="timer__time">{moment.utc(this.props.state.totalTime * 1000).format('HH:mm:ss')}</div>
            {this.props.timerErrorMessage && this.props.timerErrorMessage}
            <div className="timer__controls">
              <button className="timer__start btn" onClick={this.props.start}>
                <i className="far fa-play-circle"></i>
              </button>
              <button className="timer__stop btn" onClick={this.props.stop}>
                <i className="far fa-stop-circle"></i>
              </button>

              <button className="timer__submit btn" onClick={this.props.submit} disabled={!this.props.state?.stopped}>
                <Tooltip
                  title="Save timer"
                  position="top"
                  trigger="mouseenter"
                  style={{ display: 'block' }}
                  arrow="true"
                  theme="light"
                  disabled={!this.props.state.stopped ? true : false}
                >
                  <i className="far fa-check-circle"></i>
                </Tooltip>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
