import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { backendServer } from '../shared/constants';
import './NewJournal.scss';

const styles = {
  editor: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    minHeight: '12em',
    marginBottom: '20px',
    padding: '20px',
    fontFamily: 'Libre Baskerville, serif',
  },
};

class NewJournal extends Component {
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
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
    this.createPost = this.createPost.bind(this);
    this.handleJournalTitle = this.handleJournalTitle.bind(this);
  }

  async componentDidMount() {
    this.focusEditor();
    await this.props.getCategoryList();
    await this.props.getLanguageList();
  }

  onCategoryChange = (event) => {
    this.setState({ category_id: parseInt(event.target.value) });
  };

  onLanguageChange = (event) => {
    this.setState({ language_id: parseInt(event.target.value) });
  };

  handleJournalTitle(e) {
    this.setState({ journalTitle: e.target.value, errorMessage: '' });
  }

  async createPost() {
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

    try {
      if (!body.journal.title) {
        throw 'Journal must have a title';
      }

      const response = await fetch(`${backendServer}/journals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });

      const newJournal = await response.json();

      this.setState({ redirect: true, newJournalID: newJournal.id });
    } catch (err) {
      this.setState({ errorMessage: err });
    }
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

  _onCodeClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/dashboard/journals/${this.state.newJournalID}`} />;
    } else {
      return (
        <div class="new-journal">
          <div className="new-journal__options">
            <div className="new-journal__option">
              <label htmlFor="categories">Category:</label>
              <select id="categories" onChange={this.onCategoryChange}>
                {this.props.categoryOptions && this.props.renderCategoriesList()}
              </select>
            </div>
            <div className="new-journal__option">
              <label htmlFor="languages">Language:</label>
              <select id="languages" onChange={this.onLanguageChange}>
                {this.props.languageOptions && this.props.renderLanguageList()}
              </select>
            </div>
          </div>
          {this.state.errorMessage && <div style={{ color: 'red' }}>{this.state.errorMessage}</div>}
          <input className="new-journal__title" type="text" placeholder="Title..." id="title" onChange={this.handleJournalTitle} />
          <div className="rich-utils">
            <button onClick={this._onBoldClick.bind(this)}>Bold</button>
            <button onClick={this._onItalicClick.bind(this)}>Italic</button>
            <button onClick={this._onCodeClick.bind(this)}>Code Block</button>
          </div>

          <div id="journal-body" style={styles.editor} onClick={this.focusEditor}>
            <Editor ref={this.setEditor} editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange} />
          </div>

          <div className="new-journal__submit">
            <button id="post-btn" className="post-btn" onClick={this.createPost}>
              Post
            </button>
          </div>
        </div>
      );
    }
  }
}

export default NewJournal;
