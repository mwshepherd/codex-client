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
      category_id: 1,
      language_id: 1,
    };

    this.renderBookmarks = this.renderBookmarks.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
    // this.sortByCategories = this.sortByCategories.bind(this);
  }

  async componentDidMount() {
    await this.props.getUsersEntries(page);
    await this.props.getCategoryList();
    await this.props.getLanguageList();
  }

  async deleteBookmark(id) {
    // console.log('inside deleteBookmark');
    await fetch(`${backendServer}/${page}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    this.props.getUsersEntries(page);
  }

  renderBookmarks(bookmark) {
    return (
      <div key={bookmark.id} className="bookmark__entry">
        <div className="bookmark__entry-title">
          <a href={bookmark.url} target="_blank">
            {bookmark.title}
          </a>
        </div>
        <div className="bookmark__entry-description">{bookmark.description}</div>
        <div className="bookmark__entry-category">{bookmark.category.name}</div>
        <div className="bookmark__entry-language">{bookmark.language.name}</div>
        <div className="bookmark__entry-delete">
          <button onClick={() => this.deleteBookmark(bookmark.id)}>Delete</button>
        </div>
      </div>
    );
  }

  render() {
    const { bookmarks, totalPages } = this.props.state;
    const { currPage, prevPage, nextPage } = this.props;
    // console.log(this.props.state);

    return (
      <>
        <div className="bookmark">
          <h1>Bookmarks</h1>
          <div className="pagination-btns">
            <button onClick={() => prevPage(page)}>Prev</button>
            <div className="total-pages">
              {currPage} / {totalPages}
            </div>
            <button onClick={() => nextPage(page)}>Next</button>
          </div>

          <NewBookmark
            getUsersEntries={this.props.getUsersEntries}
            renderCategoriesList={this.props.renderCategoriesList}
            categoryOptions={this.props.categoryOptions}
            renderLanguageList={this.props.renderLanguageList}
            languageOptions={this.props.languageOptions}
          />
          <div className="bookmark__columns">
            <div className="bookmark__title" onClick={() => this.props.sortByType('title', page)}>
              Title & Bookmark Link
            </div>
            <div className="bookmark__description">Description</div>
            <div className="bookmark-category" onClick={() => this.props.sortByType('category', page)}>
              Category
            </div>
            <div className="bookmark-language" onClick={() => this.props.sortByType('language', page)}>
              Language
            </div>
          </div>
          <div className="bookmark__entries">{bookmarks && bookmarks.map((bookmark) => this.renderBookmarks(bookmark))}</div>
        </div>
      </>
    );
  }
}

export default Bookmarks;
