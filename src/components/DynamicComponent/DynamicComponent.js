import React, { Component } from 'react';

import Journals from '../Journals/Journals';
import NewJournal from '../NewJournal/NewJournal';
import Bookmarks from '../Bookmarks/Bookmarks';
import Goals from '../Goals/Goals';

import { backendServer } from '../shared/constants';

const components = {
  journals: Journals,
  newJournal: NewJournal,
  bookmarks: Bookmarks,
  goals: Goals,
};

class DynamicComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.currPage = 1;
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.getUsersEntries = this.getUsersEntries.bind(this);
    this.getCategoryList = this.getCategoryList.bind(this);
    this.getLanguageList = this.getLanguageList.bind(this);
    this.renderCategoriesList = this.renderCategoriesList.bind(this);
    this.renderLanguageList = this.renderLanguageList.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByCategories = this.sortByCategories.bind(this);
  }

  async getUsersEntries(page) {
    const response = await fetch(`${backendServer}/${page}?page=${this.currPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    this.setState({ [page]: data[page], total: data.total_entries, totalPages: Math.ceil(data.total_entries / 5) });
  }

  async getCategoryList() {
    const response = await fetch(`${backendServer}/categories/index`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();

    this.setState({ categoryOptions: data });
  }

  async getLanguageList() {
    const response = await fetch(`${backendServer}/language/index`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    console.log(data);
    this.setState({ languageOptions: data });
  }

  renderCategoriesList() {
    const { categoryOptions } = this.state;
    return categoryOptions.map((cat, index) => {
      return (
        <option key={index} value={cat.id}>
          {cat.name}
        </option>
      );
    });
  }

  renderLanguageList() {
    const { languageOptions } = this.state;
    console.log(languageOptions);
    return languageOptions.map((lan, index) => {
      return (
        <option key={index} value={lan.id}>
          {lan.name}
        </option>
      );
    });
  }

  nextPage(page) {
    if (this.currPage < this.state.totalPages) {
      this.currPage += 1;
      this.getUsersEntries(page);
    }
  }

  prevPage(page) {
    if (this.currPage > 1) {
      this.currPage -= 1;
      this.getUsersEntries(page);
    }
  }

  sortByCategories(page) {
    console.log(this.state[page]);
    const sorted = this.state[page].sort((a, b) => {
      let titleA, titleB;
      a.category.length > 0 ? (titleA = a.category[0].name.toLowerCase()) : (titleA = 'z');
      b.category.length > 0 ? (titleB = b.category[0].name.toLowerCase()) : (titleB = 'z');

      if (titleA < titleB) {
        return -1;
      }

      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    this.setState({ [page]: sorted });
  }

  sortByTitle(type, page) {
    const sorted = this.state[page].sort((a, b) => {
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
    this.setState({ [page]: sorted });
  }

  render() {
    const SelectedPage = components[this.props.page];
    return (
      <SelectedPage
        getUsersEntries={this.getUsersEntries}
        getCategoryList={this.getCategoryList}
        renderCategoriesList={this.renderCategoriesList}
        categoryOptions={this.state.categoryOptions}
        getLanguageList={this.getLanguageList}
        renderLanguageList={this.renderLanguageList}
        languageOptions={this.state.languageOptions}
        state={this.state}
        currPage={this.currPage}
        nextPage={this.nextPage}
        prevPage={this.prevPage}
        sortByTitle={this.sortByTitle}
        sortByCategories={this.sortByCategories}
        user={this.props.user}
      />
    );
  }
}

export default DynamicComponent;
