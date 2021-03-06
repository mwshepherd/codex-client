import React, { Component } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import './Home.scss';
import { backendServer } from '../shared/constants';

momentDurationFormatSetup(moment);

class Home extends Component {
  constructor() {
    super();

    this.getUserData = this.getUserData.bind(this);
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.getTimer = this.getTimer.bind(this);
  }

  async componentDidMount() {
    await this.getUserData();
    await this.getTimer();
    await this.getRandomQuote();
  }

  async getUserData() {
    const response = await fetch(`${backendServer}/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();

    this.setState({ userData: data });
  }

  async getTimer() {
    const response = await fetch(`${backendServer}/timer`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();

    this.setState({ timer: data });
  }

  async getRandomQuote() {
    const response = await fetch('https://programming-quotes-api.herokuapp.com/quotes/random/lang/en');
    const data = await response.json();

    this.setState({ randomQuote: data });
  }
  render() {
    const { user } = this.props;
    return (
      <div className="home">
        <div className="home-title">
          <h1>Welcome, {user.username}!</h1>
        </div>
        <div className="home__grid">
          <div className="home__grid-item">
            <h2>Latest Journals</h2>
            {this.state?.userData &&
              this.state.userData.latest_journals.map((journal) => {
                return (
                  <a href={`/dashboard/journals/${journal.id}`} key={journal.id} className="latest-journal">
                    <h3 className="title">{journal.title}</h3>
                    <h4 className="date">{moment(journal.created_at).format('D/MM/YYYY')}</h4>
                  </a>
                );
              })}
          </div>
          <div className="home__grid-item total-time">
            {this.state?.timer && (
              <div className="time">{moment.duration(this.state.timer.time_length, 'minutes').format('h')}</div>
            )}
            <div className="spent-studying">Total hours studying</div>
          </div>
          <div className="home__grid-item">
            <h2>Latest Goals</h2>
            {this.state?.userData &&
              this.state.userData.goals_due_soonest.map((goal) => {
                return (
                  <a href="/dashboard/goals" key={goal.id} className="latest-goal">
                    <h3>{goal.title}</h3>
                    <div className="due-date">
                      Due: <h4>{moment(goal.due_date).format('D/MM/YYYY')}</h4>
                    </div>
                  </a>
                );
              })}
          </div>
          <div className="home__grid-item chart">
            <h2>Current activity</h2>
            {this.state?.userData && <LineChart data={this.state.userData.total_entries_by_date} width="100%" />}
          </div>
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
