import React, { Component } from 'react';
import moment from 'moment';
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
    // const date = moment(bookmark.created_at).format('dddd, MMMM Do YYYY, h:mm:ss a');
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
        {/* <div>{date}</div> */}
      </div>
    )
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
            <div className="bookmark-title">Title & Bookmark Link</div>
            <div className="bookmark-description">Description</div>
            <div className="bookmark-categories">Category</div>
          </div>
        {bookmarks.length && bookmarks.map((bookmark) => this.renderBookmarks(bookmark))}
        </div>
      </>
    );
  }
}

export default Bookmarks;
