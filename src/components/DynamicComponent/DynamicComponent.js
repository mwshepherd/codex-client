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
  }

  async getUsersEntries(page) {
    console.log('inside get users entries');
    const response = await fetch(`${backendServer}/${page}?page=${this.currPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    this.setState({ [page]: data[page], total: data.totalBookmarks, totalPages: Math.ceil(data.totalBookmarks / 5) });
  }

  nextPage(page) {
    if (this.currPage < this.state.totalPages) {
      this.currPage += 1;
      this.getUsersEntries(page);
    }
  }

  prevPage(page) {
    // console.log(thi);
    if (this.currPage > 1) {
      this.currPage -= 1;
      this.getUsersEntries(page);
    }
  }

  render() {
    console.log(this.state);
    console.log(this.currPage);
    console.log('inside dynamic component');
    const SelectedPage = components[this.props.page];
    return <SelectedPage getUsersEntries={this.getUsersEntries} state={this.state} currPage={this.currPage} nextPage={this.nextPage} prevPage={this.prevPage} />;
  }
}

export default DynamicComponent;
