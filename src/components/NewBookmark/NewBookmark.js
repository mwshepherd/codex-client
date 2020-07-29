import React, { Component } from 'react';
import './NewBookmark.scss';
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';

const defaultState = {
  category_id: '15',
  language_id: '25',
};

class NewBookmark extends Component {
  state = { ...defaultState };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      errorMessage: '',
    });
  };

  onCategoryChange = (event) => {
    this.setState({ category_id: event.target.value });
  };

  onLanguageChange = (event) => {
    this.setState({ language_id: event.target.value });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();

    const body = {
      bookmark: this.state,
    };

    try {
      if (!body.bookmark.title) {
        throw 'Bookmark must have a title';
      } else if (!body.bookmark.url) {
        throw 'Bookmark must have a URL';
      } else if (!body.bookmark.description) {
        throw 'Bookmark must have a short description';
      }

      await fetch('http://localhost:3000/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });
      this.props.getUsersEntries('bookmarks');
      this.setState({ ...defaultState });
    } catch (err) {
      this.setState({ errorMessage: err });
    }
  };

  render() {
    return (
      <div className="bookmark__form">
        <form onSubmit={this.onFormSubmit}>
          {/* {this.state.errorMessage && <div style={{ color: 'red' }}>{this.state.errorMessage}</div>} */}
          {this.state.errorMessage && window.alert(this.state.errorMessage)}
          <input
            className="bookmark__form-title"
            type="text"
            value={this.state.title}
            name="title"
            id="title"
            placeholder="Title"
            onChange={this.onInputChange}
          />
          <input
            className="bookmark__form-url"
            type="text"
            value={this.state.url}
            name="url"
            id="url"
            placeholder="URL"
            onChange={this.onInputChange}
          />

          <input
            className="bookmark__form-description"
            value={this.state.description}
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            onChange={this.onInputChange}
          />

          <select id="categories" onChange={this.onCategoryChange}>
            {this.props.categoryOptions && this.props.renderCategoriesList()}
          </select>

          <select id="languages" onChange={this.onLanguageChange}>
            {this.props.languageOptions && this.props.renderLanguageList()}
          </select>

          <input type="submit" value=" + " />
          {/* <h3 onClick={this.props.togglePopUp}>Close</h3> */}
        </form>
      </div>
    );
  }
}

export default NewBookmark;
