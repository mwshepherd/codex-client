import React, { Component } from 'react';
import moment from 'moment';
import './Timer.scss';

export default class Timer extends Component {
  render() {
    // console.log(this.props);
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
              {/* {this.state?.stopped && ( */}
              <button className="timer__submit btn" onClick={this.props.submit} disabled={!this.props.state?.stopped}>
                <i className="far fa-check-circle"></i>
              </button>
              {/* )} */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
