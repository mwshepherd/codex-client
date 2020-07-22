import React, { Component } from 'react';

import Journals from '../Journals/Journals';
import Bookmarks from '../Bookmarks/Bookmarks';
import Goals from '../Goals/Goals';

import { backendServer } from '../shared/constants';

const components = {
  journals: Journals,
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
    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByCategories = this.sortByCategories.bind(this);
  }

  async getUsersEntries(page) {
    console.log('inside get users entries');
    const response = await fetch(`${backendServer}/${page}?page=${this.currPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    this.setState({ [page]: data[page], total: data.totalEntries, totalPages: Math.ceil(data.totalEntries / 5) });
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
    this.setState({ [page]: sorted });
  }

  sortByTitle(type, page) {
    console.log(this.state[page]);
    const sorted = this.state[page].sort((a, b) => {
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
    this.setState({ [page]: sorted });
  }

  render() {
    console.log(this.state);
    console.log(this.currPage);
    console.log('inside dynamic component');
    const SelectedPage = components[this.props.page];
    return (
      <SelectedPage
        getUsersEntries={this.getUsersEntries}
        state={this.state}
        currPage={this.currPage}
        nextPage={this.nextPage}
        prevPage={this.prevPage}
        sortByTitle={this.sortByTitle}
        sortByCategories={this.sortByCategories}
      />
    );
  }
}

export default DynamicComponent;
