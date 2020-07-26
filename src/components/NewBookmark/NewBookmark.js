import React, { Component } from 'react';
import './NewBookmark.scss';

const defaultState = {
  title: '',
  url: '',
  description: '',
  category_id: '15',
  language_id: '25',
};

class NewBookmark extends Component {
  state = { ...defaultState };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onCategoryChange = (event) => {
    this.setState({ category_id: event.target.value });
  };

  onLanguageChange = (event) => {
    // console.log(this.state)
    this.setState({ language_id: event.target.value });
    console.log(this.state);
  };

  onFormSubmit = async (event) => {
    event.preventDefault();

    const body = {
      bookmark: this.state,
    };

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
  };

  render() {
    console.log(this.state);
    return (
      <div className="bookmark__form">
        <form onSubmit={this.onFormSubmit}>
          {/* <h1>Add a Bookmark</h1> */}

          {/* <label htmlFor="title">Title:</label> */}
          <input className="bookmark__form-title" type="text" value={this.state.title} name="title" id="title" placeholder="Title" onChange={this.onInputChange} />

          {/* <label htmlFor="url">URL:</label> */}
          <input className="bookmark__form-url" type="text" value={this.state.url} name="url" id="url" placeholder="URL" onChange={this.onInputChange} />

          {/* <label htmlFor="description">Description:</label> */}
          <input
            className="bookmark__form-description"
            value={this.state.description}
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            onChange={this.onInputChange}
          />

          <label htmlFor="categories">Category:</label>
          <select id="categories" onChange={this.onCategoryChange}>{this.props.categoryOptions && this.props.renderCategoriesList()}</select>

          <label htmlFor="languages">Language:</label>
          <select id="languages" onChange={this.onLanguageChange}>{this.props.languageOptions && this.props.renderLanguageList()}</select>

          <input type="submit" value=" + " />
          {/* <h3 onClick={this.props.togglePopUp}>Close</h3> */}
        </form>
      </div>
    );
  }
}

export default NewBookmark;
