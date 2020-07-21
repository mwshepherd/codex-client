import React, { Component } from 'react';
import './Bookmarks.scss';
import { backendServer } from '../shared/constants';
import NewBookmark from '../NewBookmark/NewBookmark';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
    };

    // this.currPage = 1;
    // this.getUsersBookmarks = this.getUsersBookmarks.bind(this);
    this.renderBookmarks = this.renderBookmarks.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByCategories = this.sortByCategories.bind(this);
    // this.nextPage = this.nextPage.bind(this);
    // this.prevPage = this.prevPage.bind(this);
  }

  async componentDidMount() {
    // await this.getUsersBookmarks();
    await this.props.getUsersEntries('bookmarks');
  }

  // async getUsersBookmarks() {
  //   const response = await fetch(`${backendServer}/bookmarks?page=${this.currPage}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   });
  //   const data = await response.json();
  //   this.setState({ bookmarks: data.bookmarks, totalBookmarks: data.totalBookmarks, totalPages: Math.ceil(data.totalBookmarks / 5) });
  // }

  renderBookmarks(bookmark) {
    // console.log(bookmark);
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
          <button>Delete</button>
        </div>
      </div>
    );
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
    this.setState({ bookmarks: sorted });
  }

  sortByTitle(type) {
    const sorted = this.state.bookmarks.sort((a, b) => {
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
    this.setState({ bookmarks: sorted });
  }

  // nextPage() {
  //   if (this.currPage < this.state.totalPages) {
  //     this.currPage += 1;
  //     this.getUsersBookmarks();
  //   }
  // }

  // prevPage() {
  //   if (this.currPage > 1) {
  //     this.currPage -= 1;
  //     this.getUsersBookmarks();
  //   }
  // }

  render() {
    console.log(this.state);
    const { bookmarks, totalPages } = this.props.state;
    const { currPage, prevPage, nextPage } = this.props;
    // console.log(bookmarks);
    return (
      <>
        <h1>Bookmarks</h1>
        <NewBookmark getUsersBookmarks={this.getUsersBookmarks} />
        <div className="bookmarks-table">
          <div className="bookmark">
            <div className="bookmark-title" onClick={() => this.sortByTitle('title')}>
              Title & Bookmark Link
            </div>
            <div className="bookmark-description">Description</div>
            <div className="bookmark-categories" onClick={this.sortByCategories}>
              Category
            </div>
          </div>
          {bookmarks && bookmarks.map((bookmark) => this.renderBookmarks(bookmark))}
        </div>
        <div className="pagination-btns">
          <button onClick={() => prevPage('bookmarks')}>Prev</button>
          <div className="total-pages">
            {currPage} / {totalPages}
          </div>
          <button onClick={() => nextPage('bookmarks')}>Next</button>
        </div>
      </>
    );
  }
}

export default Bookmarks;
