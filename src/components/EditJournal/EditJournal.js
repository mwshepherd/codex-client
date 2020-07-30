import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { backendServer } from '../shared/constants';
import './EditJournal.scss';

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
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const journal = await response.json();
    this.setState({
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(journal.body))),
      journal: journal,
    });
  }

  onCategoryChange = (event) => {
    this.setState({ category_id: event.target.value });
  };

  onLanguageChange = (event) => {
    this.setState({ language_id: event.target.value });
  };

  handleJournalTitle(e) {
    this.setState({ journalTitle: e.target.value });
  }

  async updatePost() {
    const converted = convertToRaw(this.state.editorState.getCurrentContent());

    const body = {
      journal: {
        title: this.state.journalTitle,
        body: JSON.stringify(converted),
        category_id: this.state.category_id,
        language_id: this.state.language_id,
      },
    };
    const { id } = this.props.locationProps.match.params;
    await fetch(`${backendServer}/journals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(body),
    });

    this.setState({ redirect: true });
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
    if (this.state.journal) {
      const { title } = this.state.journal;

      if (this.state.redirect) {
        return <Redirect to={`/dashboard/journals/${this.state.journal.id}`} />;
      } else {
        return (
          <div className="edit-journal">
            <div className="edit-journal__options">
              <div className="edit-journal__option">
                <label htmlFor="categories">Category:</label>
                <select id="categories" onChange={this.onOptionChange}>
                  {this.props.categoryOptions && this.props.renderCategoriesList()}
                </select>
              </div>
              <div className="edit-journal__option">
                <label htmlFor="languages">Language:</label>
                <select id="languages" onChange={this.onLanguageChange}>
                  {this.props.languageOptions && this.props.renderLanguageList()}
                </select>
              </div>
            </div>
            <input
              className="edit-journal__title"
              type="text"
              placeholder="New Journal Title"
              id="title"
              value={title}
              onChange={this.handleJournalTitle}
            />
            <div className="rich-utils">
              <button onClick={this._onBoldClick.bind(this)}>Bold</button>
              <button onClick={this._onItalicClick.bind(this)}>Italic</button>
              <button onClick={this._onCodeClick.bind(this)}>Code Block</button>
            </div>
            <div style={styles.editor} onClick={this.focusEditor}>
              <Editor
                ref={this.setEditor}
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
              />
            </div>

            <div className="edit-journal__submit">
              <button className="post-btn" onClick={this.updatePost}>
                Update
              </button>
            </div>
          </div>
        );
      }
    }
    return <p>Loading..</p>;
  }
}

export default EditJournal;
