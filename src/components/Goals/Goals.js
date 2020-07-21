import React, { Component } from 'react';
import './Goals.scss';
import { backendServer } from '../shared/constants';

class Goals extends Component {
  constructor(props) {
  super(props);
  this.state = {
    goals: []
  };

  this.getUsersGoals = this.getUsersGoals.bind(this);
  this.renderActiveGoals = this.renderActiveGoals.bind(this);
  }

  async componentDidMount() {
    await this.getUsersGoals();
  }

  async getUsersGoals() {
    const response = await fetch(`${backendServer}/goals`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    this.setState({ goals: data.goals })
  }

  renderActiveGoals(goal) {
    // console.log(goal);
    // const categories = 
    // goal.categories && 
    // goal.categories.map((category) => {
    //   return (
    //     <span key={category.id} className="category">#{category.name}</span>
    //   );
    // });

    if (goal.completed == false) {
      return (
        <div key={goal.id} className="goal">
          <div className="goal-title">{goal.title}</div>
          <div className="goal-body">{goal.body}</div>
          <div className="goal-due_date">{goal.due_date}</div>
        </div>
      )
    }
  }

  render() {
    // console.log(this.state);
    const { goals } = this.state;
    console.log(goals);
    return (
      <>
        <h1>Goals</h1>
        <div className="goals-table">
          <div className="goal">
            <div className="goal-title">Goal</div>
            <div className="goal-body">Details</div>
            <div className="goal-due_date">Due Date</div>
          </div>
        {goals.length && goals.map((goal) => this.renderActiveGoals(goal))}
        </div>
      </>
    );
  }
}

export default Goals;
