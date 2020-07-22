import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Journal.scss';
import { backendServer } from '../shared/constants';

const page = 'journals';

class Journals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journals: [],
    };

    this.renderJournalEntries = this.renderJournalEntries.bind(this);
  }

  async componentDidMount() {
    await this.props.getUsersEntries(page);
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

  render() {
    console.log(this.state);
    const { journals, totalPages } = this.props.state;
    const { currPage, prevPage, nextPage } = this.props;
    console.log(journals);
    return (
      <>
        <h1>Journals</h1>
        <div className="journals-table">
          <div className="journal-entry">
            <div className="journal-title" onClick={() => this.props.sortByTitle('title', page)}>
              Title
            </div>
            <div className="journal-date">Date</div>
            <div className="journal-category" onClick={() => this.props.sortByCategories(page)}>
              Category
            </div>
          </div>

          {journals && journals.map((journal) => this.renderJournalEntries(journal))}
        </div>
        <div className="pagination-btns">
          <button onClick={() => prevPage('journals')}>Prev</button>
          <div className="total-pages">
            {currPage} / {totalPages}
          </div>
          <button onClick={() => nextPage('journals')}>Next</button>
        </div>
      </>
    );
  }
}

export default Journals;
