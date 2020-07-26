import React, { Component } from 'react';

import Journals from '../Journals/Journals';
import NewJournal from '../NewJournal/NewJournal';
import EditJournal from '../EditJournal/EditJournal';
import Bookmarks from '../Bookmarks/Bookmarks';
import Goals from '../Goals/Goals';
import Analytics from '../Analytics/Analytics';

import { backendServer } from '../shared/constants';

const components = {
  journals: Journals,
  newJournal: NewJournal,
  bookmarks: Bookmarks,
  goals: Goals,
  analytics: Analytics,
  editJournal: EditJournal,
};

class DynamicComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.currPage = 1;
    this.currPageCompletedGoals = 1;
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.getUsersEntries = this.getUsersEntries.bind(this);
    this.getCompletedGoals = this.getCompletedGoals.bind(this);
    this.getCategoryList = this.getCategoryList.bind(this);
    this.getLanguageList = this.getLanguageList.bind(this);
    this.renderCategoriesList = this.renderCategoriesList.bind(this);
    this.renderLanguageList = this.renderLanguageList.bind(this);
    // this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByType = this.sortByType.bind(this);
  }

  async getUsersEntries(page) {
    const response = await fetch(`${backendServer}/${page}?page=${this.currPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    console.log(data);

    this.setState({ [page]: data[page], total: data.total_entries, totalPages: Math.ceil(data.total_entries / 5) });
  }

  async getCompletedGoals() {
    const response = await fetch(`${backendServer}/goals-complete?page=${this.currPageCompletedGoals}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    console.log(data);

    this.setState({ goalsComplete: data.goalsComplete, totalCompletedGoals: data.total_entries, totalCompletedGoalsPages: Math.ceil(data.total_entries / 5) });
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
    // console.log(languageOptions);
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

  sortByType(type, page) {
    let lessThan, greaterThan, sortedType;

    if (this.state.sortedType === 'ascend') {
      lessThan = 1;
      greaterThan = -1;
      sortedType = 'descend';
    } else {
      lessThan = -1;
      greaterThan = 1;
      sortedType = 'ascend';
    }

    const sorted = this.state[page].sort((a, b) => {
      let titleA, titleB;
      if (type === 'title' || type === 'due_date' || type === 'created_at') {
        titleA = a[type].toLowerCase();
        titleB = b[type].toLowerCase();
      } else {
        titleA = a[type].name.toLowerCase();
        titleB = b[type].name.toLowerCase();
      }

      if (titleA < titleB) {
        return lessThan;
      }

      if (titleA > titleB) {
        return greaterThan;
      }
      return 0;
    });
    this.setState({ [page]: sorted, sortedType: sortedType });
  }

  render() {
    // console.log(this.state);
    const SelectedPage = components[this.props.page];
    return (
      <SelectedPage
        getUsersEntries={this.getUsersEntries}
        getCompletedGoals={this.getCompletedGoals}
        getCategoryList={this.getCategoryList}
        renderCategoriesList={this.renderCategoriesList}
        categoryOptions={this.state.categoryOptions}
        getLanguageList={this.getLanguageList}
        renderLanguageList={this.renderLanguageList}
        languageOptions={this.state.languageOptions}
        state={this.state}
        currPageCompletedGoals={this.currPageCompletedGoals}
        currPage={this.currPage}
        nextPage={this.nextPage}
        prevPage={this.prevPage}
        sortByType={this.sortByType}
        user={this.props.user}
        locationProps={this.props.locationProps}
        bookmarkPopUp={this.props.bookmarkPopUp}
        toggleBookmarkPopUp={this.props.toggleBookmarkPopUp}
      />
    );
  }
}

export default DynamicComponent;
