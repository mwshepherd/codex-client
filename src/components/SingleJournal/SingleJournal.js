import React, { Component } from 'react';
import moment from 'moment';

class SingleJournal extends Component {
  render() {
    const { title, body, created_at } = this.props.currentJournal;
    const date = moment(created_at).format('dddd, MMMM Do YYYY, h:mm:ss a');
    return (
      <>
        <h1>{title}</h1>
        <h3>{date}</h3>
        <div>{body}</div>
        <button onClick={() => this.props.setCurrentPage('journals')}>Back</button>
      </>
    );
  }
}

export default SingleJournal;
