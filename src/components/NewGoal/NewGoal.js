import React, { Component } from "react";
import "./NewGoal.scss";

const defaultState = {
  category_id: "15",
  language_id: "25",
};

class NewGoal extends Component {
  state = { ...defaultState };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      errorMessage: "",
    });
  };

  onCategoryChange = (event) => {
    this.setState({ category_id: event.target.value });
  };

  onLanguageChange = (event) => {
    this.setState({ language_id: event.target.value });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();

    const body = {
      goal: this.state,
    };

    try {
      if (!body.goal.title) {
        throw "Goal must have a title";
      } else if (!body.goal.body) {
        throw "Goal must have a short description";
      } else if (!body.goal.due_date) {
        throw "Goal must have a due date selected";
      }
      await fetch("http://localhost:3000/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });
      this.props.getUsersEntries("goals");
      this.setState({ ...defaultState });
    } catch (err) {
      this.setState({ errorMessage: err });
    }
  };

  render() {
    return (
      <div className="goal__form">
        <form onSubmit={this.onFormSubmit}>
          {this.state.errorMessage && window.alert(this.state.errorMessage)}

          <input
            className="goal-title"
            type="text"
            value={this.state.title}
            name="title"
            id="title"
            placeholder="Goal"
            onChange={this.onInputChange}
          />

          <input
            className="goal-body"
            type="text"
            value={this.state.body}
            name="body"
            id="body"
            placeholder="Details"
            onChange={this.onInputChange}
          />

          <input
            className="goal-due_date"
            type="date"
            value={this.state.due_date}
            name="due_date"
            id="due_date"
            onChange={this.onInputChange}
          />

          <select id="categories" onChange={this.onCategoryChange}>
            {this.props.categoryOptions && this.props.renderCategoriesList()}
          </select>

          <select id="languages" onChange={this.onLanguageChange}>
            {this.props.languageOptions && this.props.renderLanguageList()}
          </select>

          <input type="submit" value=" + " />
        </form>
      </div>
    );
  }
}

export default NewGoal;
