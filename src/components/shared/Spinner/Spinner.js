import React, { Component } from 'react';
import spinner from './spinner.gif';

const spinnerDiv = {
  width: '100%',
  textAlign: 'center',
};

class Spinner extends Component {
  render() {
    return (
      <div className="spinner" style={spinnerDiv}>
        <img src={spinner} style={{ width: '30px' }} alt="Loading..." />
      </div>
    );
  }
}

export default Spinner;
