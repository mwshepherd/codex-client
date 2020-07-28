import React, { Component } from 'react';
import './Bookmarks.scss';
import NewBookmark from '../NewBookmark/NewBookmark';
import { backendServer } from '../shared/constants';
import Spinner from '../shared/Spinner/Spinner';

const page = 'bookmarks';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      category_id: 1,
      language_id: 1,
      popUp: false,
    };

    this.renderBookmarks = this.renderBookmarks.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
    this.togglePopUp = this.togglePopUp.bind(this);
  }

  async componentDidMount() {
    await this.props.getUsersEntries(page);
    await this.props.getCategoryList();
    await this.props.getLanguageList();
  }

  async deleteBookmark(id) {
    await fetch(`${backendServer}/${page}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    this.props.getUsersEntries(page);
  }

  togglePopUp() {
    this.setState({ popUp: !this.state.popUp });
  }

  renderBookmarks(bookmark) {
    return (
      <div key={bookmark.id} className="bookmark__entry">
        <div className="bookmark__entry-title">
          <a href={bookmark.url} target="_blank">
            {bookmark.title}
          </a>
          <div className="bookmark__entry-delete">
            <button className="delete-btn" onClick={() => this.deleteBookmark(bookmark.id)}>
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <div className="bookmark__entry-description">{bookmark.description}</div>
        <div className="bookmark__entry-category">{bookmark.category.name}</div>
        <div className="bookmark__entry-language">{bookmark.language.name}</div>
      </div>
    );
  }

  render() {
    const { bookmarks, totalPages } = this.props.state;
    const { currPage, prevPage, nextPage, loading } = this.props;

    return (
      <>
        <div className="bookmark">
          <div className="page-header">
            <h1>Bookmarks</h1>
          </div>
          <NewBookmark
            getUsersEntries={this.props.getUsersEntries}
            renderCategoriesList={this.props.renderCategoriesList}
            categoryOptions={this.props.categoryOptions}
            renderLanguageList={this.props.renderLanguageList}
            languageOptions={this.props.languageOptions}
            togglePopUp={this.togglePopUp}
          />

          <div className="bookmark__entries">
            <div className="pagination-btns">
              <button onClick={() => prevPage(page)}>Prev</button>
              <div className="total-pages">
                {currPage} / {totalPages}
              </div>
              <button onClick={() => nextPage(page)}>Next</button>
            </div>
            <div className="bookmark__columns">
              <div className="bookmark__title" onClick={() => this.props.sortByType('title', page)}>
                <span>Title & Bookmark Link</span>
                <i className="fas fa-sort"></i>
              </div>
              <div className="bookmark__description">
                <span>Description</span>
              </div>
              <div className="bookmark__category" onClick={() => this.props.sortByType('category', page)}>
                <span>Category</span>
                <i className="fas fa-sort"></i>
              </div>
              <div className="bookmark__language" onClick={() => this.props.sortByType('language', page)}>
                <span>Language</span>
                <i className="fas fa-sort"></i>
              </div>
            </div>
            {loading === false ? bookmarks.map((bookmark) => this.renderBookmarks(bookmark)) : <Spinner />}
          </div>
        </div>
      </>
    );
  }
}

export default Bookmarks;
