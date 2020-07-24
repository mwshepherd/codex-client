import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Journal.scss';

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
    const date = moment(journal.created_at).format('D/MM/YYYY');

    return (
      <div key={journal.id} className="journal__entry">
        <Link
          to={{
            pathname: `/dashboard/journals/${journal.id}`,
          }}
          className="journal__entry-title"
        >
          {journal.title}
        </Link>
        <div className="journal__entry-categories">{journal.category.name}</div>
        <div className="journal__entry-date">{date}</div>
      </div>
    );
  }

  render() {
    const { journals, totalPages } = this.props.state;
    const { currPage, prevPage, nextPage } = this.props;

    return (
      <>
        <div className="journal">
          <div className="journal__header">
            <h1>Journals</h1>
            <div className="add-journal">Add</div>
          </div>
          <div className="journal__columns">
            <div className="journal__title" onClick={() => this.props.sortByType('title', page)}>
              <span>Title</span>
              <i class="fas fa-sort"></i>
            </div>
            <div className="journal__category" onClick={() => this.props.sortByType('category', page)}>
              <span>Category</span>
              <i class="fas fa-sort"></i>
            </div>
            <div className="journal-date" onClick={() => this.props.sortByType('created_at', page)}>
              <span>Date</span>
              <i class="fas fa-sort"></i>
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
