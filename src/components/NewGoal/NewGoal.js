import React, { Component } from "react";
import "../Goals/Goals.scss";

class NewGoal extends Component {
  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    // console.log(this.state);
  };

  onCategoryChange = (event) => {
    // console.log(this.state)
    this.setState({ category_id: event.target.value });
    // console.log(this.state)
  };

  onLanguageChange = (event) => {
    // console.log(this.state)
    this.setState({ language_id: event.target.value });
    // console.log(this.state);
  };

  onFormSubmit = async (event) => {
    event.preventDefault();

    const body = {
      goal: this.state,
    };

    await fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });
    this.props.getUsersEntries("goals");
  };

  render() {
    // console.log(this.props);
    return (
      <div className="newgoal-form">
        <form onSubmit={this.onFormSubmit}>
          {/* <h1>Add a goal</h1> */}

          <label htmlFor="title">Title:</label>
          <input
            className="goal-title"
            type="text"
            name="title"
            id="title"
            onChange={this.onInputChange}
          />

          <label htmlFor="body">Body:</label>
          <input
            className="goal-body"
            type="text"
            name="body"
            id="body"
            onChange={this.onInputChange}
          />

          <label htmlFor="due_date">Due Date:</label>
          <input
            className="goal-due_date"
            type="date"
            name="due_date"
            id="due_date"
            onChange={this.onInputChange}
          />

          {/* this is not necessary - it defaults to not yet complete as per back end logic  */}
          {/* <label htmlFor="completed">Completed?</label> */}
          {/* this event handler might not work */}
          {/* <select onChange={this.onInputChange}> */}
            {/* <option value="true">Completed</option>
            <option defaultValue="false">Not Yet Completed</option> */}
          {/* </select> */}

          <label htmlFor="categories">Category:</label>
          <select onChange={this.onCategoryChange}>
            {this.props.categoryOptions && this.props.renderCategoriesList()}
          </select>

          <label htmlFor="languages">Language:</label>
          <select onChange={this.onLanguageChange}>
            {this.props.languageOptions && this.props.renderLanguageList()}
          </select>

          <input type="submit" value=" + " />
        </form>
      </div>
    );
  }
}

export default NewGoal;
