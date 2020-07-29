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
    this.getCategories = this.getCategories.bind(this);
    this.getCounts = this.getCounts.bind(this);
  }

  async componentDidMount() {
    await this.getActivity();
    await this.getLanguages();
    await this.getCategories();
    await this.getCounts();
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

  async getCategories() {
    const response = await fetch(`${backendServer}/analytics/categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();

    this.setState({ categories: data });
  }

  async getCounts() {
    const response = await fetch(`${backendServer}/analytics/counts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();

    this.setState({ counts: data });
  }

  render() {
    return (
      <div className="analytics">
        <div className="page-header">
          <h1>Analytics</h1>
        </div>
        <div className="analytics__grid">
          <div className="analytics__grid-item">
            {this.state?.counts && <div className="active-goals">{this.state.counts.journals_total}</div>}
            <h2>Journals</h2>
          </div>
          <div className="analytics__grid-item">
            {this.state?.counts && <div className="active-goals">{this.state.counts.bookmarks_total}</div>}
            <h2>Bookmarks</h2>
          </div>
          <div className="analytics__grid-item">
            {this.state?.counts && <div className="active-goals">{this.state.counts.active_goals}</div>}
            <h2>Active Goals</h2>
          </div>
        </div>

        <div className="analytics__chart">
          <h2>All Activity</h2>
          {this.state?.activity.total_entries_by_date && <LineChart data={this.state.activity.total_entries_by_date} width="100%" />}
        </div>

        <div className="analytics__chart">
          <h2>Journals</h2>
          {this.state?.activity.journals ? <ColumnChart data={this.state.activity.journals} width="100%" /> : null}
        </div>

        <div className="analytics__languages-categories">
          <div className="analytics__chart">
            <h2>Languages</h2>
            {this.state?.languages ? <PieChart data={this.state.languages.total_entries_by_language} width="100%" /> : null}
          </div>

          <div className="analytics__chart">
            <h2>Categories</h2>
            {this.state?.categories ? <PieChart data={this.state.categories.total_entries_by_category} width="100%" /> : null}
          </div>
        </div>

        {/* <PieChart data={data} width="100%" /> */}
      </div>
    );
  }
}
