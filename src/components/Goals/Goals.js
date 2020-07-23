import React, { Component } from "react";
import "./Goals.scss";
import { backendServer } from "../shared/constants";
import NewGoal from '../NewGoal/NewGoal';
import moment from 'moment';

const page = 'goals';

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      category_id: 1,
      language_id: 1
    };

    this.renderActiveGoals = this.renderActiveGoals.bind(this);
    this.renderCompleteGoals = this.renderCompleteGoals.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
    this.completeGoal = this.completeGoal.bind(this);
  }

  async componentDidMount() {
    await this.props.getUsersEntries(page);
    await this.props.getCategoryList();
    await this.props.getLanguageList();
  }

  async deleteGoal(id) {
    await fetch(`${backendServer}/${page}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.props.getUsersEntries(page);
  }

  async completeGoal(id) {
    const date = moment(Date.now()).format('YYYY-MM-DD');
    console.log(date)

    await fetch(`${backendServer}/${page}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        completed: true,
        completed_date: date,
      }),
    });
    window.alert("Well done on achieving your goals!🎉")
    this.props.getUsersEntries(page);
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

    const due_date = moment(goal.due_date).format('DD/MM/YYYY');

    if (goal.completed === false) {
      return (
        <div key={goal.id} className="goal">
          <div className="goal-title">{goal.title}</div>
          <div className="goal-body">{goal.body}</div>
          <div className="goal-due_date">{due_date}</div>
          <div className="goal-category">{goal.category.name}</div>
          <div className="goal-language">{goal.language.name}</div>
          <div className="goal-completed">
            <button onClick={() => this.completeGoal(goal.id)}>Mark Complete</button>
          </div>
          <div className="goal-delete">
            <button onClick={() => this.deleteGoal(goal.id)}>Delete</button>
          </div>
        </div>
      );
    }
  }

  renderCompleteGoals(goal) {
    const completed_date = moment(goal.completed_date).format('DD/MM/YYYY');

    if (goal.completed === true) {
      return (
        <div key={goal.id} className="goal">
          <div className="goal-title">{goal.title}</div>
          <div className="goal-body">{goal.body}</div>
          <div className="goal-completed_date">{completed_date}</div>
          <div className="goal-category">{goal.category.name}</div>
          <div className="goal-language">{goal.language.name}</div>
        </div>
      );
    }
  }

  render() {
    const { goals, totalPages } = this.props.state;
    const { currPage, prevPage, nextPage } = this.props

    return (
      <>
        <h1>Active Goals</h1>
        <NewGoal
          getUsersEntries={this.props.getUsersEntries}
          renderCategoriesList={this.props.renderCategoriesList}
          categoryOptions={this.props.categoryOptions}
          renderLanguageList={this.props.renderLanguageList}
          languageOptions={this.props.languageOptions}
        />
        <div className="goals-table">
          <div className="goal">
            <div className="goal-title">Goal</div>
            <div className="goal-body">Details</div>
            <div className="goal-due_date">Due Date</div>
            <div className="goal-category">Category</div>
            <div className="goal-language">Language</div>
            <div className="goal-completed">Mark Completed</div>
          </div>
          {goals && goals.map((goal) => this.renderActiveGoals(goal))}
        </div>
        <div className="pagination-btns">
          <button onClick={() => prevPage(page)}>Prev</button>
          <div className="total-pages">
            {currPage} / {totalPages}
          </div>
          <button onClick={() => nextPage(page)}>Next</button>
        </div>
        
        <br/><br/>
        <hr/> 
        <br/><br/>

        <h1>Completed Goals</h1>
        <div className="goals-table">
          <div className="goal">
            <div className="goal-title">Goal</div>
            <div className="goal-body">Details</div>
            <div className="goal-completed_date">Completed Date</div>
            <div className="goal-category">Category</div>
            <div className="goal-language">Language</div>
          </div>
          {goals && goals.map((goal) => this.renderCompleteGoals(goal))}
        </div>
        <div className="pagination-btns">
          <button onClick={() => prevPage(page)}>Prev</button>
          <div className="total-pages">
            {currPage} / {totalPages}
          </div>
          <button onClick={() => nextPage(page)}>Next</button>
        </div>
      </>
    );


  }
}

export default Goals;
