import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { backendServer } from "../shared/constants";

const page = "journals";

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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const journal = await response.json();
    console.log(journal);
    this.setState({ journal: journal });
  }

  async deleteJournal(id) {
    await fetch(`${backendServer}/${page}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(this.props);
    this.props.locationProps.history.push("/dashboard/journals");
  }

  render() {
    console.log(this.props.state);
    if (this.state.journal) {
      const { title, body, created_at } = this.state.journal;
      const date = moment(created_at).format("dddd, MMMM Do YYYY, h:mm:ss a");
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
          <div className="journal-delete">

            <Link to={{
              pathname: `/dashboard/journals/edit/${this.state.journal.id}`, 
              state: { currentPage: 'edit-journal', currentJournal: this.state.journal, id: this.state.journal.id, journal: this.state.journal }
              }} >
              <button>Edit</button>
            </Link>

            <button onClick={() => this.deleteJournal(this.state.journal.id)}>
              Delete
            </button>
          </div>
        </>
      );
    }

    return <div>Loading...</div>;
  }
}

export default SingleJournal;
