import React, { Component } from 'react';
import { LineChart, PieChart, ColumnChart } from 'react-chartkick';
import 'chart.js';
import './Home.scss';

import { backendServer } from '../shared/constants';

class Home extends Component {
  constructor() {
    super();

    this.getUserData = this.getUserData.bind(this);
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  async componentDidMount() {
    await this.getUserData();
    await this.getRandomQuote();
  }

  async getUserData() {
    const response = await fetch(`${backendServer}/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    console.log(data);

    this.setState({ userData: data });
  }

  async getRandomQuote() {
    const response = await fetch('https://programming-quotes-api.herokuapp.com/quotes/random/lang/en');
    const data = await response.json();

    console.log(data);

    this.setState({ randomQuote: data });
  }
  render() {
    console.log(this.state);

    const { user } = this.props;
    return (
      <div className="home">
        <div className="page-header home-title">
          <h1>Welcome, {user.username}!</h1>
        </div>
        <div className="home__grid">
          <div className="home__grid-item"></div>
          <div className="home__grid-item"></div>
          <div className="home__grid-item"></div>
          <div className="home__grid-item chart">{this.state?.userData.total_entries_by_date && <LineChart data={this.state.userData.total_entries_by_date} width="100%" />}</div>
          {this.state?.randomQuote && (
            <div className="home__grid-item">
              <div className="random-quote">
                <div className="quote">"{this.state.randomQuote.en}"</div>
                <div className="author">- {this.state.randomQuote.author}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
