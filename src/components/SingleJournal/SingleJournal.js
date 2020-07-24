import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

import { backendServer } from '../shared/constants';

class SingleJournal extends Component {
  constructor() {
    super();
    this.state = {
      // journal: {},
    };

    this.getSingleJournal = this.getSingleJournal.bind(this);
  }

  async componentDidMount() {
    await this.getSingleJournal();
  }

  async getSingleJournal() {
    const { id } = this.props.locationProps.match.params;
    const response = await fetch(`${backendServer}/journals/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const journal = await response.json();

    this.setState({ journal: journal });
  }

  render() {
    if (this.state.journal) {
      const { title, body, created_at } = this.state.journal;
      const date = moment(created_at).format('dddd, MMMM Do YYYY, h:mm:ss a');
      const parsedBody = JSON.parse(body);
      const contentState = convertFromRaw(parsedBody);
      const editorState = EditorState.createWithContent(contentState);

      return (
        <>
          <h1>{title}</h1>
          <h3>{date}</h3>
          {/* <div>{body}</div> */}
          <Editor editorState={editorState} readOnly={false} />
          <Link to="/dashboard/journals">Back</Link>
        </>
      );
    }

    return <div>Loading...</div>;
  }
}

export default SingleJournal;
