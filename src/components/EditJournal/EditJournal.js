import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { backendServer } from "../shared/constants";
import moment from "moment";

const styles = {
  editor: {
    border: "1px solid gray",
    minHeight: "6em",
  },
};

class EditJournal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      category_id: 1,
      language_id: 1,
      redirect: false,
    };
    this.onChange = (editorState) => this.setState({ editorState });

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.getSingleJournal = this.getSingleJournal.bind(this);

    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
    this.updatePost = this.updatePost.bind(this);
    this.handleJournalTitle = this.handleJournalTitle.bind(this);
  }

  async componentDidMount() {
    this.focusEditor();
    await this.getSingleJournal();
    await this.props.getCategoryList();
    await this.props.getLanguageList();
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
    this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(journal.body))), journal: journal });
  }

  onCategoryChange = (event) => {
    this.setState({ category_id: event.target.value });
  };

  onLanguageChange = (event) => {
    this.setState({ language_id: event.target.value });
    console.log(this.state);
  };

  handleJournalTitle(e) {
    this.setState({ journalTitle: e.target.value });
  }

  async updatePost() {
    const converted = convertToRaw(this.state.editorState.getCurrentContent());
    const jsonString = JSON.stringify(converted);
    const jsonConvert = JSON.parse(jsonString);

    const body = {
      journal: {
        title: this.state.journalTitle,
        body: JSON.stringify(converted),
        category_id: this.state.category_id,
        language_id: this.state.language_id,
      },
    };
    console.log(this.state)
    const { id } = this.props.locationProps.match.params;
    console.log(this.props)
    const response = await fetch(`${backendServer}/journals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    // const updatedJournal = await response.json();
    // console.log(updatedJournal);

    this.setState({ redirect: true});
    // console.log(this.state.updatedJournalID)
    // this.props.locationProps.history.push(`/dashboard/journals${id}`);

  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return "handled";
    }

    return "not-handled";
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  _onItalicClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  }

  _onCodeClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "CODE"));
  }

  render() {
    console.log(this.state)
    if (this.state.journal) {
      const { title, body, created_at } = this.state.journal;
      const date = moment(created_at).format("dddd, MMMM Do YYYY, h:mm:ss a");
      const parsedBody = JSON.parse(body);
      const contentState = convertFromRaw(parsedBody);
      const editorState = EditorState.createWithContent(contentState);

      console.log(this.props);
      // console.log(this.state);
      if (this.state.redirect) {
        return (
          <Redirect to={`/dashboard/journals/${this.state.journal.id}`} />
        );
      } else {
        return (
          <div>
            {/* <h1>New Journal Page</h1> */}
            <input
              type="text"
              placeholder="New Journal Title"
              id="title"
              value={title}
              onChange={this.handleJournalTitle}
            />
            <button onClick={this._onBoldClick.bind(this)}>Bold</button>
            <button onClick={this._onItalicClick.bind(this)}>Italic</button>
            <button onClick={this._onCodeClick.bind(this)}>Code Block</button>
            <div style={styles.editor} onClick={this.focusEditor}>
              <Editor
                ref={this.setEditor}
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
              />
            </div>

            <label htmlFor="categories">Category:</label>
            <select onChange={this.onOptionChange}>
              {this.props.categoryOptions && this.props.renderCategoriesList()}
            </select>

            <label htmlFor="languages">Language:</label>
            <select onChange={this.onLanguageChange}>
              {this.props.languageOptions && this.props.renderLanguageList()}
            </select>

            <div className="post-btn">
              <button onClick={this.updatePost}>Post</button>
            </div>
          </div>
        );
      }
    } return (
    <p>Loading..</p>
  )
}}

export default EditJournal;
