import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { backendServer } from '../shared/constants';
import './SingleJournal.scss';

const page = 'journals';

class SingleJournal extends Component {
  constructor() {
    super();
    this.state = {
      // journal: {},
    };

    this.getSingleJournal = this.getSingleJournal.bind(this);
    this.deleteJournal = this.deleteJournal.bind(this);
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

  async deleteJournal(id) {
    await fetch(`${backendServer}/${page}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    this.props.locationProps.history.push('/dashboard/journals');
  }

  render() {
    if (this.state.journal) {
      const { title, body, created_at } = this.state.journal;
      const date = moment(created_at).format('dddd, MMMM Do YYYY, h:mm:ss a');
      const parsedBody = JSON.parse(body);
      const contentState = convertFromRaw(parsedBody);
      const editorState = EditorState.createWithContent(contentState);

      return (
        <div className="single-journal">
          <div className="single-journal__controls">
            <Link to="/dashboard/journals" className="btn">
              <i className="fas fa-arrow-left"></i>
            </Link>
            <div className="single-journal__options">
              <Link to={`/dashboard/journals/edit/${this.state.journal.id}`} className="btn edit">
                <i className="far fa-edit"></i>
              </Link>

              <button onClick={() => this.deleteJournal(this.state.journal.id)} className="btn delete">
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <h1 className="single-journal__title">{title}</h1>
          <h3 className="single-journal__date">{date}</h3>
          {/* <div>{body}</div> */}
          <div className="single-journal__body">
            <Editor editorState={editorState} readOnly={true} />
          </div>
        </div>
      );
    }

    return <div>Loading...</div>;
  }
}

export default SingleJournal;
