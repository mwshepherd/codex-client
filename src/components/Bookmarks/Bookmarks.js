import React, { Component } from 'react';
import './Bookmarks.scss';
import { backendServer } from '../shared/constants';
import NewBookmark from '../NewBookmark/NewBookmark';

class Bookmarks extends Component {
  constructor(props) {
  super(props);
  this.state = {
    bookmarks: [], 
    categories: []
  };

  this.getUsersBookmarks = this.getUsersBookmarks.bind(this);
  this.getCategories = this.getCategories.bind(this);
  this.renderBookmarks = this.renderBookmarks.bind(this);
  this.sortByTitle = this.sortByTitle.bind(this);
  this.sortByCategories = this.sortByCategories.bind(this);
  this.currPage = 1;
  this.nextPage = this.nextPage.bind(this);
  this.prevPage = this.prevPage.bind(this);
  }

  async componentDidMount() {
    await this.getUsersBookmarks();
    await this.getCategories();
  }

  async getUsersBookmarks() {
    const response = await fetch(`${backendServer}/bookmarks?page=${this.currPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    this.setState({ bookmarks: data.bookmarks })
    console.log(this.state)
  }

  async getCategories() {
    const response = await fetch(`${backendServer}categories/index`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    console.log(data)
    this.setState({ categories: data })
    console.log(this.state)
  }

  renderBookmarks(bookmark) {
    // console.log(bookmark);
    const category = 
    bookmark.category.name && 
    bookmark.category.map((category) => {
      return (
        <span key={category.id} className="category">#{category.name}</span>
      );
    });

    return (
      <div key={bookmark.id} className="bookmark">
        <div className="bookmark-title"><a href={bookmark.url} target="_blank">{bookmark.title}</a></div>
        <div className="bookmark-description">{bookmark.description}</div>
        <div className="bookmark-categories">{bookmark.category.name}</div>
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
      // console.log(type);
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

  nextPage() {
    this.currPage += 1;
    this.getUsersBookmarks();
  }

  prevPage() {
    this.currPage -=1;
    this.getUsersBookmarks();
  }

  render() {
    // console.log(this.state);
    const { bookmarks } = this.state;
    // console.log(bookmarks);
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
        <button onClick={this.nextPage}>Next</button>
        <button onClick={this.prevPage}>Prev</button>
        <NewBookmark />

      </>
    );
  }
}

export default Bookmarks;
