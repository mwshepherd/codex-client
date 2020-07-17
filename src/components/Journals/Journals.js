import React, { Component } from 'react';
import { backendServer } from '../shared/constants';

class Journals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journals: {},
    };

    this.getUsersJournals = this.getUsersJournals.bind(this);
    this.renderJournalEntries = this.renderJournalEntries.bind(this);
  }

  async componentDidMount() {
    await this.getUsersJournals();
  }

  async getUsersJournals() {
    const response = await fetch(`${backendServer}/journals`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    this.setState({ journals: data.journals });
  }

  renderJournalEntries(journal) {
    return (
      <div className="journal-entry">
        <div className="journal-entry__title">{journal.title}</div>
      </div>
    );
  }

  render() {
    console.log(this.state);
    return (
      <>
        <div>Journals</div>
      </>
    );
  }
}

export default Journals;
