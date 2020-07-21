import React, { Component } from 'react';
import './Bookmarks.scss';
import { backendServer } from '../shared/constants';


class Bookmarks extends Component {
  constructor(props) {
  super(props);
  this.state = {
    bookmarks: []
  };

  this.getUsersBookmarks = this.getUsersBookmarks.bind(this);
  this.renderBookmarks = this.renderBookmarks.bind(this);
  this.sortByTitle = this.sortByTitle.bind(this);
  this.sortByCategories = this.sortByCategories.bind(this);
  }

  async componentDidMount() {
    await this.getUsersBookmarks();
  }

  async getUsersBookmarks() {
    const response = await fetch(`${backendServer}/bookmarks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    this.setState({ bookmarks: data.bookmarks })
  }

  renderBookmarks(bookmark) {
    console.log(bookmark);
    const categories = 
    bookmark.categories && 
    bookmark.categories.map((category) => {
      return (
        <span key={category.id} className="category">#{category.name}</span>
      );
    });

    return (
      <div key={bookmark.id} className="bookmark">
        <div className="bookmark-title"><a href={bookmark.url}>{bookmark.title}</a></div>
        <div className="bookmark-description">{bookmark.description}</div>
        <div className="bookmark-categories">{categories}</div>
      </div>
    )
  }

  sortByCategories() {
    const sorted = this.state.bookmarks.sort((a, b) => {
      let titleA, titleB;
      a.categories.length > 0 ? (titleA = a.categories[0].name.toLowerCase()) : (titleA = 'z');
      b.categories.length > 0 ? (titleB = b.categories[0].name.toLowerCase()) : (titleB = 'z');

      if (titleA < titleB) {
        return -1;
      }

      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    this.setState({bookmarks: sorted})
  }

  sortByTitle(type) {
    const sorted = this.state.bookmarks.sort((a,b) => {
      console.log(type);
      let titleA = a[type].toLowerCase();
      let titleB = b[type].toLowerCase();

      if (titleA < titleB) {
        return -1;
      }

      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    this.setState({bookmarks: sorted})
  }

  render() {
    console.log(this.state);
    const { bookmarks } = this.state;
    console.log(bookmarks);
    return (
      <>
        <h1>Bookmarks</h1>
        <div className="bookmarks-table">
          <div className="bookmark">
            <div className="bookmark-title" onClick={() => this.sortByTitle('title')}>Title & Bookmark Link</div>
            <div className="bookmark-description">Description</div>
            <div className="bookmark-categories" onClick={this.sortByCategories}>Category</div>
          </div>
        {bookmarks.length && bookmarks.map((bookmark) => this.renderBookmarks(bookmark))}
        </div>
      </>
    );
  }
}

export default Bookmarks;
