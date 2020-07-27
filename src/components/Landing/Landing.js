import React, { Component } from 'react';
import './Landing.scss';
import { backendServer } from '../shared/constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errMessage: '',
      loading: false,
    };

    this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  }

  async onLoginFormSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const body = {
      auth: { email, password },
    };
    try {
      const response = await fetch(`${backendServer}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400) {
        throw new Error('incorrect credentials');
      } else {
        const { jwt } = await response.json();
        localStorage.setItem('token', jwt);
        this.props.landingProps.history.push('/dashboard');
      }
    } catch (err) {
      this.setState({
        errMessage: err.message,
        loading: false,
      });
    }
  }

  render() {
    // console.log(this.state);
    // console.log(this.props);
    const { username, email, password, errMessage } = this.state;
    const { closePopUp } = this.props;
    return (
      <div className="popup">
        <div onClick={closePopUp} className="popup__close"></div>
        <div className="popup__wrapper">
          <div className="popup__inner">
            <div className="header">
              <h1>Login</h1>
              <button className="close-btn" onClick={closePopUp}>
                <i className="far fa-times-circle"></i>
              </button>
            </div>
            {errMessage && <span>{errMessage}</span>}
            <form className="user-form" onSubmit={this.onLoginFormSubmit}>
              <input type="text" name="email" id="email" value={email} placeholder="email" onChange={this.onInputChange} />
              <input type="password" name="password" id="password" value={password} placeholder="password" onChange={this.onInputChange} />
              <button>Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errMessage: '',
      loading: false,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  }

  async onFormSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const { username, email, password } = this.state;
    const body = {
      user: { email, password, username },
    };
    try {
      const response = await fetch(`${backendServer}/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400) {
        throw new Error('incorrect credentials');
      } else {
        const response = await fetch(`${backendServer}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({auth: { email, password }}),
        });
        const { jwt } = await response.json();
        localStorage.setItem('token', jwt);
        this.props.landingProps.history.push('/dashboard');
      }
    } catch (err) {
      this.setState({
        errMessage: err.message,
        loading: false,
      });
    }
  }

  render() {
    // console.log(this.state);
    // console.log(this.props);
    const { username, email, password, errMessage } = this.state;
    const { closePopUp } = this.props;
    return (
      <div className="popup">
        <div onClick={closePopUp} className="popup__close"></div>
        <div className="popup__wrapper">
          <div className="popup__inner">
            <div className="header">
              <h1>Sign Up</h1>
              <button className="close-btn" onClick={closePopUp}>
                <i className="far fa-times-circle"></i>
              </button>
            </div>
            {errMessage && <span>{errMessage}</span>}
            <form className="user-form" onSubmit={this.onFormSubmit}>
              <input type="text" name="username" id="username" value={username} placeholder="username" onChange={this.onInputChange} />
              <input type="text" name="email" id="email" value={email} placeholder="email" onChange={this.onInputChange} />
              <input type="password" name="password" id="password" value={password} placeholder="password" onChange={this.onInputChange} />
              <button>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      show: 'main',
    };

    this.showPopUp = this.showPopUp.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
  }

  showPopUp(query) {
    this.setState({ show: query });
  }

  closePopUp() {
    this.setState({ show: 'main' });
  }

  render() {
    // console.log(this.props);
    return (
      <div className="landingpage">
        <nav className="landingpage__nav">
          <button className="btn">About</button>
          <button className="btn" onClick={() => this.showPopUp('login')}>
            Login
          </button>
          <button className="btn"onClick={() => this.showPopUp('signup')} >Sign up</button>
        </nav>
        <div className="landingpage__start">
          <div className="landingpage__intro">
            <div className="landingpage__title">
              <h1 className="landingpage__site-name">Codex</h1>
              <h2 className="landingpage__tagline">The learning & productivity app for devs</h2>
            </div>
            <div className="landingpage__preview"></div>
          </div>
        </div>
        <div className="landingpage__about" id="about">
          <div className="landingpage__intro">
            <div className="landingpage__title-about">
              <h2 class="about-title">About</h2>
            </div>
            <div className="landingpage__info">
              <h3>capture journal entries including code snippets</h3>
              <h3>collect & categorize your bookmarks for easy reference</h3>
              <h3>track your goals and due date milestones</h3>
              <h3>view your learning & productivity statistics</h3>
            </div>
          </div>
        </div>
        {this.state.show === 'login' ? <Login landingProps={this.props} closePopUp={this.closePopUp} /> : null}
        {this.state.show === 'signup' ? <SignUp landingProps={this.props} closePopUp={this.closePopUp} /> : null}
      </div>
    );
  }
}

export default Landing;
