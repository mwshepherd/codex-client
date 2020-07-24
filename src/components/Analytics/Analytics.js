import React, { Component } from 'react';
import { LineChart, PieChart, ColumnChart } from 'react-chartkick';
import 'chart.js';
import './Analytics.scss';

const data = {
  Journal: 2,
  Bookmarks: 15,
  Goals: 10,
};

export default class Analytics extends Component {
  render() {
    return (
      <div>
        <h1>Analytics</h1>
        <div className="demo-chart">
          <LineChart data={data} width="100%" />
          <ColumnChart data={data} width="100%" />
          <PieChart data={data} width="100%" />
        </div>

        {/* <PieChart data={data} width="100%" /> */}
      </div>
    );
  }
}
