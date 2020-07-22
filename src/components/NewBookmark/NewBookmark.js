import React, { Component } from "react";
import "../Bookmarks/Bookmarks.scss";

class NewBookmark extends Component {
  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    // console.log(this.state);
  };

  onCategoryChange = (event) => {
    // console.log(this.state)
    this.setState({category_id: event.target.value})
    // console.log(this.state)
  };

  onLanguageChange = (event) => {
    // console.log(this.state)
    this.setState({language_id: event.target.value})
    console.log(this.state)
  };

  onFormSubmit = async (event) => {
    event.preventDefault();

    const body = {
      bookmark: this.state,
    };

    await fetch("http://localhost:3000/bookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    this.props.getUsersEntries("bookmarks");
  };

  render() {
    // console.log(this.props);
    return (
      <div className="newbookmark-form">
        <form onSubmit={this.onFormSubmit}>
          {/* <h1>Add a Bookmark</h1> */}

          <label htmlFor="title">Title:</label>
          <input
            className="bookmark-title"
            type="text"
            name="title"
            id="title"
            onChange={this.onInputChange}
          />

          <label htmlFor="url">URL:</label>
          <input
            className="bookmark-url"
            type="text"
            name="url"
            id="url"
            onChange={this.onInputChange}
          />

          <label htmlFor="url">Description:</label>
          <input
            className="bookmark-description"
            type="text"
            name="description"
            id="description"
            onChange={this.onInputChange}
          />

          <label htmlFor="categories">Category:</label>
          <select onChange={this.onCategoryChange}>
            {this.props.categoryOptions && this.props.renderCategoriesList()}
          </select>

          <label htmlFor="languages">Language:</label>
          <select onChange={this.onLanguageChange}>
            {this.props.languageOptions && this.props.renderLanguageList()}
          </select>

          <input
            className="bookmark-category"
            type="integer"
            name="category_id"
            id="category_id"
            onChange={this.onInputChange}
          />
          // <select></select>

          // <input type="submit" value=" + " />
        </form>
      </div>
    );
  }
}

export default NewBookmark;
