import React, { Component } from 'react';
import moment from 'moment';
import NewGoal from '../NewGoal/NewGoal';
import Spinner from '../shared/Spinner/Spinner';
import { backendServer } from '../shared/constants';
import './Goals.scss';

const page = 'goals';

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      category_id: 1,
      language_id: 1,
    };

    this.renderActiveGoals = this.renderActiveGoals.bind(this);
    this.renderCompleteGoals = this.renderCompleteGoals.bind(this);
    this.deleteGoal = this.deleteGoal.bind(this);
    this.completeGoal = this.completeGoal.bind(this);
  }

  async componentDidMount() {
    await this.props.getUsersEntries(page);
    await this.props.getCompletedGoals();
    await this.props.getCategoryList();
    await this.props.getLanguageList();
  }

  async deleteGoal(id) {
    await fetch(`${backendServer}/${page}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    this.props.getUsersEntries(page);
    this.props.getCompletedGoals();
  }

  async completeGoal(id) {
    const date = moment(Date.now()).format('YYYY-MM-DD');

    await fetch(`${backendServer}/${page}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        completed: true,
        completed_date: date,
      }),
    });
    window.alert('Well done on achieving your goals!🎉');
    this.props.getUsersEntries(page);
    this.props.getCompletedGoals();
  }

  renderActiveGoals(goal) {
    const due_date = moment(goal.due_date).format('DD/MM/YYYY');

    if (goal.completed === false) {
      return (
        <div key={goal.id} className="goal__entry">
          <div className="goal__entry-title">
            <span>
              <div className="goal__entry-title-bld">{goal.title}</div>
              <div className="goal__entry-details">{goal.body}</div>
            </span>

            <div className="goal__entry-delete">
              <button className="delete-btn" onClick={() => this.deleteGoal(goal.id)}>
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
          </div>

          <div className="goal__entry-due-date">{due_date}</div>
          <div className="goal__entry-category">{goal.category.name}</div>
          <div className="goal__entry-language">{goal.language.name}</div>
          <div className="goal__entry-completed">
            <button className="complete-btn" onClick={() => this.completeGoal(goal.id)}>
              <i className="far fa-check-circle"></i>
            </button>
          </div>
        </div>
      );
    }
  }

  renderCompleteGoals(goal) {
    const completed_date = moment(goal.completed_date).format('DD/MM/YYYY');

    if (goal.completed === true) {
      return (
        <div key={goal.id} className="goal__entry">
          <div className="goal__entry-title">
            <span>
              <div className="goal__entry-title-bld">{goal.title}</div>
              <div className="goal__entry-details">{goal.body}</div>
            </span>
            <div className="goal__entry-delete">
              <button className="delete-btn" onClick={() => this.deleteGoal(goal.id)}>
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
          </div>

          <div className="goal__entry-completed_date">{completed_date}</div>
          <div className="goal__entry-category">{goal.category.name}</div>
          <div className="goal__entry-language">{goal.language.name}</div>
          <div className="goal__entry-completed">
            <button className="completed-btn">
              <i className="far fa-check-circle"></i>
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    const { goals, totalPages, goalsComplete, totalCompletedGoalsPages } = this.props.state;
    const { currPage, currPageCompletedGoals, prevPage, nextPage, loading } = this.props;

    return (
      <>
        <div className="goal">
          <div className="page-header">
            <h1>Active Goals</h1>
          </div>
          <NewGoal
            getUsersEntries={this.props.getUsersEntries}
            renderCategoriesList={this.props.renderCategoriesList}
            categoryOptions={this.props.categoryOptions}
            renderLanguageList={this.props.renderLanguageList}
            languageOptions={this.props.languageOptions}
          />
          <div className="goal__entries">
            <div className="pagination-btns">
              <button onClick={() => prevPage(page)}>Prev</button>
              <div className="total-pages">
                {currPage} / {totalPages}
              </div>
              <button onClick={() => nextPage(page)}>Next</button>
            </div>
            <div className="goal__columns">
              <div className="goal__title" onClick={() => this.props.sortByType('title', page)}>
                <span>Goal</span>
                <i className="fas fa-sort"></i>
              </div>
              {/* <div className="goal__details">Details</div> */}
              <div className="goal__due-date" onClick={() => this.props.sortByType('due_date', page)}>
                <span>Due Date</span>
                <i className="fas fa-sort"></i>
              </div>
              <div className="goal__category" onClick={() => this.props.sortByType('category', page)}>
                <span>Category</span>
                <i className="fas fa-sort"></i>
              </div>
              <div className="goal__language" onClick={() => this.props.sortByType('language', page)}>
                <span>Language</span>
                <i className="fas fa-sort"></i>
              </div>
              <div className="goal__completed">Complete</div>
            </div>
            {loading === false && goals ? goals.map((goal) => this.renderActiveGoals(goal)) : <Spinner />}
          </div>
        </div>

        <br />
        <br />
        <hr />
        <br />
        <br />

        <div className="goal">
          <div className="page-header">
            <h1>Completed Goals</h1>
          </div>
          <div className="goal__entries completed">
            <div className="pagination-btns">
              <button onClick={() => prevPage('goals-complete')}>Prev</button>
              <div className="total-pages">
                {currPageCompletedGoals} / {totalCompletedGoalsPages}
              </div>
              <button onClick={() => nextPage('goals-complete')}>Next</button>
            </div>
            <div className="goal__columns">
              <div className="goal__title">
                <span>Goal</span>
                <i className="fas fa-sort"></i>
              </div>

              <div className="goal__completed_date">
                <span>Completed</span>
                <i className="fas fa-sort"></i>
              </div>
              <div className="goal__category">
                <span>Category</span>
                <i className="fas fa-sort"></i>
              </div>
              <div className="goal__language">
                <span>Language</span>
                <i className="fas fa-sort"></i>
              </div>
              <div className="goal__completed">
                <span>Complete</span>
              </div>
            </div>
            {loading == false && goalsComplete ? goalsComplete.map((goal) => this.renderCompleteGoals(goal)) : <Spinner />}
          </div>
        </div>
      </>
    );
  }
}

export default Goals;
