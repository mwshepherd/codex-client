import React, { Component } from 'react';
import { LineChart, PieChart, ColumnChart } from 'react-chartkick';
import 'chart.js';
import './Analytics.scss';

import { backendServer } from '../shared/constants';

const data = {
  Journal: 2,
  Bookmarks: 15,
  Goals: 10,
};

export default class Analytics extends Component {
  constructor() {
    super();
    this.getActivity = this.getActivity.bind(this);
    this.getLanguages = this.getLanguages.bind(this);
  }

  async componentDidMount() {
    await this.getActivity();
    await this.getLanguages();
  }

  async getActivity() {
    const response = await fetch(`${backendServer}/analytics/activity`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();

    this.setState({ activity: data });
  }

  async getLanguages() {
    const response = await fetch(`${backendServer}/analytics/languages`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();

    this.setState({ languages: data });
  }

  async getCategories() {}

  render() {
    // console.log(this.props.user);
    // console.log(this.state?.languages);

    return (
      <div>
        <h1>Analytics</h1>
        <div className="demo-chart">
          <div className="all-activity">
            <h2>All Activity</h2>
            {this.state?.activity.total_entries_by_date ? <LineChart data={this.state.activity.total_entries_by_date} width="100%" /> : null}
          </div>

          <div className="all-activity">
            <h2>Journals</h2>
            {this.state?.activity.journals ? <ColumnChart data={this.state.activity.journals} width="100%" /> : null}
          </div>

          <div className="all-activity">
            <h2>Languages</h2>
            {this.state?.languages ? <PieChart data={this.state.languages.total_entries_by_language} width="100%" /> : null}
          </div>
        </div>

        {/* <PieChart data={data} width="100%" /> */}
      </div>
    );
  }
}
