import React, { Component } from 'react';
import './Landing.scss';
import { backendServer } from '../shared/constants';
import Spinner from '../shared/Spinner/Spinner';
import landingIMG from '../../images/landing.png';

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
    const { email, password, errMessage, loading } = this.state;
    const { closePopUp } = this.props;
    return (
      <div className="popup">
        <div onClick={closePopUp} className="popup__close"></div>
        <div className="popup__wrapper">
          <div className="popup__inner">
            <div className="header">
              <h1>Login</h1>
              <button id="Login" className="close-btn" onClick={closePopUp}>
                <i className="far fa-times-circle"></i>
              </button>
            </div>
            {errMessage && <span>{errMessage}</span>}
            <form className="user-form" onSubmit={this.onLoginFormSubmit}>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                placeholder="email"
                onChange={this.onInputChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="password"
                onChange={this.onInputChange}
              />
              <button>{loading ? 'Loading...' : 'Login'}</button>
              {loading && <Spinner />}
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
          body: JSON.stringify({ auth: { email, password } }),
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
    const { username, email, password, errMessage, loading } = this.state;
    const { closePopUp } = this.props;
    return (
      <div className="popup">
        <div onClick={closePopUp} className="popup__close"></div>
        <div className="popup__wrapper">
          <div className="popup__inner">
            <div className="header">
              <h1>Sign Up</h1>
              <button id="SignUp" className="close-btn" onClick={closePopUp}>
                <i className="far fa-times-circle"></i>
              </button>
            </div>
            {errMessage && <span>{errMessage}</span>}
            <form className="user-form" onSubmit={this.onFormSubmit}>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                placeholder="username"
                onChange={this.onInputChange}
              />
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                placeholder="email"
                onChange={this.onInputChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="password"
                onChange={this.onInputChange}
              />
              <button>{loading ? 'Loading...' : 'Sign Up'}</button>
              {loading && <Spinner />}
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
    return (
      <div className="landingpage">
        <nav className="landingpage__nav">
          <a href="#about" className="btn">
            About
          </a>
          <button className="btn" onClick={() => this.showPopUp('login')}>
            Login
          </button>
          <button className="btn" onClick={() => this.showPopUp('signup')}>
            Sign up
          </button>
        </nav>
        <div className="landingpage__start">
          <div className="landingpage__intro">
            <div className="landingpage__title">
              <h1 className="landingpage__site-name">Codex</h1>
              <h2 className="landingpage__tagline">The learning & productivity app for devs</h2>
            </div>
            <div className="landingpage__preview">
              <img src={landingIMG} style={{ width: '100%', borderRadius: '5px' }} alt="App Preview" />
            </div>
          </div>
        </div>
        <div className="landingpage__about" id="about">
          <div className="landingpage__intro blurb">
            <div className="landingpage__title-about">
              <h2 className="about-title">About</h2>
            </div>
            <div className="landingpage__info">
              <p>
                To become a better coder, you have to be intentional — in how you read and write code, in how you study
                new concepts, and even in the way you take breaks and refresh your mind. Intention is key to progress. A
                journal gives you a place to work through your thoughts (e.g. algorithm steps, design process, or
                whatever else) in a concrete way. You can see everything before you. Not only does it make you less
                prone to errors, but it’ll help solidify those concepts in your mind.
              </p>
              <p>
                It records a history of your progress and development. This may be the biggest benefit of journaling,
                especially for new coders. The hardest part about being a newbie is being blind to your own progress and
                feeling like you aren’t moving forward. But each journal entry represents a discrete achievement. It
                feels good, and that’s priceless when learning. It’s also useful for staying motivated on long-term
                projects because the journal acts as an objective reminder of how far you’ve come. When you feel like
                you aren’t making progress, the journal tells you that you have — and that can be a great motivating
                boost.
              </p>
              <p>
                Lastly, a journal can be useful evidence when you sit down for an interview or to write that Medium
                article you’ve been thinking of.
              </p>
            </div>
          </div>
        </div>
        <div className="landingpage__features" id="about">
          <div className="landingpage__title-features">
            <h2 className="features-title">Features</h2>
          </div>
          <div className="landingpage__intro features">
            <div className="landingpage__feature">Feature</div>
            <div className="landingpage__feature">Feature</div>
            <div className="landingpage__feature">Feature</div>
          </div>
        </div>
        <div className="landingpage__footer">
          <div className="imprint">&copy; Copyright 2020 codex</div>
        </div>
        {this.state.show === 'login' ? <Login landingProps={this.props} closePopUp={this.closePopUp} /> : null}
        {this.state.show === 'signup' ? <SignUp landingProps={this.props} closePopUp={this.closePopUp} /> : null}
      </div>
    );
  }
}

export default Landing;
