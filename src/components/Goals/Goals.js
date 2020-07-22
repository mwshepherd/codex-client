import React, { Component } from "react";
import "./Goals.scss";
import { backendServer } from "../shared/constants";
import NewGoal from '../NewGoal/NewGoal';

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
  }

  async componentDidMount() {
    await this.props.getUsersEntries(page);
    await this.props.getCategoryList();
    await this.props.getLanguageList();
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
      </>
    );
  }
}

export default Goals;
