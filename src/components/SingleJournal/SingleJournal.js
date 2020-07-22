import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

class SingleJournal extends Component {
  render() {
    const { title, body, created_at } = this.props.currentJournal;
    const date = moment(created_at).format('dddd, MMMM Do YYYY, h:mm:ss a');
    const parsedBody = JSON.parse(body);
    const contentState = convertFromRaw(parsedBody);
    const editorState = EditorState.createWithContent(contentState);
    console.log(this.props);
    return (
      <>
        <h1>{title}</h1>
        <h3>{date}</h3>
        {/* <div>{body}</div> */}
        <Editor editorState={editorState} readOnly={true} />
        <Link to={{ pathname: '/dashboard/journals', state: { currentPage: 'journals' } }}>Back</Link>
      </>
    );
  }
}

export default SingleJournal;
