import React, { useState } from 'react';
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

const App = () => {
  const [users, setUsers] = useState([]),
    [repos, setRepos] = useState([]),
    [user, setUser] = useState({}),
    [loading, setLoading] = useState(false),
    [alert, setAlert] = useState(null),
    [alertRemoved, setAlertRemoved] = useState(false);

  const searchUser = async username => {
    try {
      setLoading(true);

      const {
        data: { items: users = [] },
      } = await axios.get(
        `https://api.github.com/search/users?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}&q=${username}`,
      );

      setUsers(users);
      setLoading(false);
    } catch ({ message }) {
      console.log('error:', message);
    }
  };

  const getUser = async login => {
    setLoading(true);

    const { data: user } = await axios.get(
      `https://api.github.com/users/${login}?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}&q=${login}`,
    );

    setUser(user);
    setLoading(false);
  };

  const getUserRepos = async login => {
    setLoading(true);

    const { data: repos } = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}&q=${login}`,
    );

    setRepos(repos);
    setLoading(false);
  };

  const clearUsers = async () => {
    setUsers([]);
    setLoading(false);
  };

  const setInputAlert = (msg, type) => {
    setAlert(() => ({ msg, type }));

    setTimeout(() => {
      if (!alertRemoved) setAlert(() => null);
      else {
        setAlert(() => null);
        setAlertRemoved(() => false);
      }
    }, 5000);
  };

  const removeAlert = () => {
    setAlert(() => null);
    setAlertRemoved(() => true);
  };

  return (
    <Router>
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />

        <div className="container">
          <Alert alert={alert} removeAlert={removeAlert} />

          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  users={users}
                  loading={loading}
                  searchUser={searchUser}
                  clearUsers={clearUsers}
                  setAlert={setInputAlert}
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
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
