import React, { Component } from 'react';

class Home extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return <div>Welcome, {user.username}!</div>;
  }
}

export default Home;
