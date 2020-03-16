import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import About from './components/pages/about/About';
import Alert from './components/layout/alert/Alert';
import Home from './components/pages/home/Home';
import Navbar from './components/layout/navbar/Navbar';
import User from './components/users/user/User';

const {
  REACT_APP_GITHUB_CLIENT_ID,
  REACT_APP_GITHUB_CLIENT_SECRET,
} = process.env;

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    alertRemoved: false,
    repos: [],
  };

  searchUser = async username => {
    try {
      this.setState(() => ({ loading: true }));

      const {
        data: { items: users = [] },
      } = await axios.get(
        `https://api.github.com/search/users?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}&q=${username}`,
      );

      this.setState(() => ({ users, loading: false }));
    } catch ({ message }) {
      console.log('error:', message);
    }
  };

  getUser = async login => {
    this.setState(() => ({ loading: true }));

    const { data: user } = await axios.get(
      `https://api.github.com/users/${login}?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}&q=${login}`,
    );

    this.setState(() => ({ loading: false, user }));
  };

  getUserRepos = async login => {
    this.setState(() => ({ loading: true }));

    const { data: repos } = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}&q=${login}`,
    );

    this.setState(() => ({ loading: false, repos }));
  };

  clearUsers = async () => {
    this.setState(() => ({ users: [], loading: false }));
  };

  setAlert = (msg, type) => {
    this.setState(() => ({ alert: { msg, type } }));

    setTimeout(() => {
      if (!this.state.alertRemoved) this.setState(() => ({ alert: null }));
      else this.setState(() => ({ alertRemoved: false }));
    }, 5000);
  };

  removeAlert = () =>
    this.setState(() => ({ alert: null, alertRemoved: true }));

  render() {
    const { users, loading, alert, user, repos } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github" />

          <div className="container">
            <Alert alert={alert} removeAlert={this.removeAlert} />

            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home
                    {...props}
                    users={users}
                    loading={loading}
                    searchUser={this.searchUser}
                    clearUsers={this.clearUsers}
                    setAlert={this.setAlert}
                  />
                )}
              />

              <Route exact path="/about" component={About} />

              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    user={user}
                    repos={repos}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
