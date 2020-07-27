import React, { Component } from 'react';
import spinner from './spinner.gif';

class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <img src={spinner} style={{ width: '30px' }} />
      </div>
    );
  }
}

export default Spinner;
