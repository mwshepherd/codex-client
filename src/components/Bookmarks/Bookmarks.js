import React, { Component } from 'react';
import './Bookmarks.scss';
import NewBookmark from '../NewBookmark/NewBookmark';
import { backendServer } from '../shared/constants';

const page = 'bookmarks';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
    };

    this.renderBookmarks = this.renderBookmarks.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
  }

  async componentDidMount() {
    await this.props.getUsersEntries(page);
  }

  async deleteBookmark(id) {
    console.log('inside deleteBookmark');
    await fetch(`${backendServer}/${page}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    this.props.getUsersEntries(page);
  }

  renderBookmarks(bookmark) {
    const categories =
      bookmark.categories &&
      bookmark.categories.map((category) => {
        return (
          <span key={category.id} className="category">
            #{category.name}
          </span>
        );
      });

    return (
      <div key={bookmark.id} className="bookmark">
        <div className="bookmark-title">
          <a href={bookmark.url} target="_blank">
            {bookmark.title}
          </a>
        </div>
        <div className="bookmark-description">{bookmark.description}</div>
        <div className="bookmark-categories">{categories}</div>
        <div className="bookmark-delete">
          <button onClick={() => this.deleteBookmark(bookmark.id)}>Delete</button>
        </div>
      </div>
    );
  }

  render() {
    const { bookmarks, totalPages } = this.props.state;
    const { currPage, prevPage, nextPage } = this.props;

    return (
      <>
        <h1>Bookmarks</h1>
        <NewBookmark getUsersEntries={this.props.getUsersEntries} />
        <div className="bookmarks-table">
          <div className="bookmark">
            <div className="bookmark-title" onClick={() => this.props.sortByTitle('title', page)}>
              Title & Bookmark Link
            </div>
            <div className="bookmark-description">Description</div>
            <div className="bookmark-categories" onClick={() => this.props.sortByCategories(page)}>
              Category
            </div>
          </div>
          {bookmarks && bookmarks.map((bookmark) => this.renderBookmarks(bookmark))}
        </div>
        <div className="pagination-btns">
          <button onClick={() => prevPage(page)}>Prev</button>
          <div className="total-pages">
            {currPage} / {totalPages}
          </div>
          <button onClick={() => nextPage(page)}>Next</button>
        </div>
      </>
    );
  }
}

export default Bookmarks;
