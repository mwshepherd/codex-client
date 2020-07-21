import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Journal.scss';
import { backendServer } from '../shared/constants';

class Journals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journals: [],
    };

    this.currPage = 1;
    this.getUsersJournals = this.getUsersJournals.bind(this);
    this.renderJournalEntries = this.renderJournalEntries.bind(this);
    this.sortByTitle = this.sortByTitle.bind(this);
    this.sortByCategories = this.sortByCategories.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  async componentDidMount() {
    await this.getUsersJournals();
  }

  async getUsersJournals() {
    const response = await fetch(`${backendServer}/journals?page=${this.currPage}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    this.setState({ journals: data.journals, totalJournals: data.totalJournals, totalPages: Math.ceil(data.totalJournals / 5) });
  }

  renderJournalEntries(journal) {
    console.log(journal);
    const date = moment(journal.created_at).format('dddd, MMMM Do YYYY, h:mm:ss a');
    const categories =
      journal.categories &&
      journal.categories.map((category) => {
        return (
          <span key={category.id} className="category">
            #{category.name}
          </span>
        );
      });

    return (
      <div key={journal.id} className="journal-entry">
        {/* <div
          className="journal-entry__title"
          onClick={() => {
            this.props.setCurrentPage('single-journal');
            this.props.setCurrentJournal(journal);
          }}
        > */}
        <Link to={{ pathname: `/dashboard/journals/${journal.id}`, state: { currentPage: 'single-journal', currentJournal: journal } }}>{journal.title}</Link>
        {/* </div> */}
        <div className="journal-entry__date">{date}</div>
        <div className="journal-entry__categories">{categories}</div>
      </div>
    );
  }

  sortByCategories() {
    const sorted = this.state.journals.sort((a, b) => {
      let titleA, titleB;
      console.log(a);
      console.log(b);
      a.categories.length > 0 ? (titleA = a.categories[0].name.toLowerCase()) : (titleA = 'z');
      b.categories.length > 0 ? (titleB = b.categories[0].name.toLowerCase()) : (titleB = 'z');

      console.log(titleA);
      console.log(titleB);

      if (titleA < titleB) {
        return -1;
      }

      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });

    console.log(sorted);
    this.setState({ journals: sorted });
  }

  sortByTitle(type) {
    const sorted = this.state.journals.sort((a, b) => {
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

    console.log(sorted);
    this.setState({ journals: sorted });
  }

  nextPage() {
    if (this.currPage < this.state.totalPages) {
      this.currPage += 1;
      this.getUsersJournals();
    }
  }

  prevPage() {
    // console.log(thi);
    if (this.currPage > 1) {
      this.currPage -= 1;
      this.getUsersJournals();
    }
  }

  render() {
    console.log(this.state);
    const { journals } = this.state;
    console.log(journals);
    return (
      <>
        <h1>Journals</h1>
        <div className="journals-table">
          <div className="journal-entry">
            <div className="journal-title" onClick={() => this.sortByTitle('title')}>
              Title
            </div>
            <div className="journal-date">Date</div>
            <div className="journal-category" onClick={this.sortByCategories}>
              Category
            </div>
          </div>

          {journals.length && journals.map((journal) => this.renderJournalEntries(journal))}
        </div>
        <div className="pagination-btns">
          <button onClick={this.prevPage}>Prev</button>
          <div className="total-pages">
            {this.currPage} / {this.state.totalPages}
          </div>
          <button onClick={this.nextPage}>Next</button>
        </div>
      </>
    );
  }
}

export default Journals;
