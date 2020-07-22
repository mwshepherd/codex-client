import React, { Component } from 'react';
import '../Bookmarks/Bookmarks.scss';

class NewBookmark extends Component {
  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    // console.log(this.state);
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
  };

  render() {
    // console.log(this.props.categoriesList)
    console.log(this.props)
    return (
      <div className="newbookmark-form">
        <form onSubmit={this.onFormSubmit}>
          {/* <h1>Add a Bookmark</h1> */}

          <label htmlFor="title">Title:</label>
          <input className="bookmark-title" type="text" name="title" id="title" onChange={this.onInputChange} />

          <label htmlFor="url">URL:</label>
          <input className="bookmark-url" type="text" name="url" id="url" onChange={this.onInputChange} />

          <label htmlFor="url">Description:</label>
          <input className="bookmark-description" type="text" name="description" id="description" onChange={this.onInputChange} />

          {/* <label htmlFor="categories">Category:</label> */}
          {/* <input className="bookmark-category" type="text" name="category_id" id="category_id" onChange={this.onInputChange} /> */}

          <label htmlFor="categories">Category:</label>
          <select>{this.props.categoryOptions && this.props.renderCategoriesList()}</select>
          {/* <select value={cat.name}>
          </select> */}
          <input type="submit" value=" + " />
        </form>
      </div>
    );
  }
}

export default NewBookmark;
