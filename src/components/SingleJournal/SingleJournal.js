import React, { Component } from 'react';

class SingleJournal extends Component {
  render() {
    const { title, body } = this.props.currentJournal;
    return (
      <>
        <div>{title}</div>
        <div>{body}</div>
      </>
    );
  }
}

export default SingleJournal;
