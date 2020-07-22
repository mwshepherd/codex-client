import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { backendServer } from '../shared/constants';

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em',
  },
};

class NewJournal extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
    this.creatPost = this.creatPost.bind(this);
    this.handleJournalTitle = this.handleJournalTitle.bind(this);
  }

  componentDidMount() {
    this.focusEditor();
  }

  handleJournalTitle(e) {
    console.log(e.target.value);
    this.setState({ journalTitle: e.target.value });
  }

  async creatPost() {
    const converted = convertToRaw(this.state.editorState.getCurrentContent());
    console.log(converted);
    const jsonString = JSON.stringify(converted);
    const jsonConvert = JSON.parse(jsonString);
    console.log(jsonConvert);

    const body = {
      journal: {
        title: this.state.journalTitle,
        body: JSON.stringify(converted),
        user_id: this.props.user.id,
        category_id: 1,
      },
    };

    await fetch(`${backendServer}/journals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(body),
    });
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  render() {
    console.log(this.props.user);
    console.log(this.state);
    return (
      <div>
        {/* <h1>New Journal Page</h1> */}
        <input type="text" placeholder="New Journal Title" id="title" onChange={this.handleJournalTitle} />
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button onClick={this._onItalicClick.bind(this)}>Italic</button>
        <div style={styles.editor} onClick={this.focusEditor}>
          <Editor ref={this.setEditor} editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange} />
        </div>
        <div className="post-btn">
          <button onClick={this.creatPost}>Post</button>
        </div>
      </div>
    );
  }
}

export default NewJournal;
