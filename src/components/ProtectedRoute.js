import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { backendServer } from './shared/constants';

class ProtectedRoute extends React.Component {
  state = {
    auth: false,
    loading: true,
  };

  async componentDidMount() {
    try {
      const response = await fetch(`${backendServer}/status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status >= 400) {
        throw new Error('not authorized');
      } else {
        const { jwt } = await response.json();
        localStorage.setItem('token', jwt);
        this.setState({
          auth: true,
          loading: false,
        });
      }
    } catch (err) {
      console.log(err.message);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading, auth } = this.state;
    // debugger;
    if (!loading && !auth) {
      return <Redirect to="/" />;
    } else {
      return !loading && <Route exact={this.props.exact} path={this.props.path} component={this.props.component} myProp={'prop'} />;
    }
  }
}

export default ProtectedRoute;
