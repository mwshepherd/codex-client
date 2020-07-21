import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class SingleJournal extends Component {
  render() {
    const { title, body, created_at } = this.props.currentJournal;
    const date = moment(created_at).format('dddd, MMMM Do YYYY, h:mm:ss a');
    console.log(this.props);
    return (
      <>
        <h1>{title}</h1>
        <h3>{date}</h3>
        <div>{body}</div>
        <Link to={{ pathname: '/dashboard/journals', state: { currentPage: 'journals' } }}>Back</Link>
      </>
    );
  }
}

export default SingleJournal;
