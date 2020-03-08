import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import About from './components/pages/about/About';
import Alert from './components/layout/alert/Alert';
import Home from './components/pages/home/Home';
import Navbar from './components/layout/navbar/Navbar';

const {
  REACT_APP_GITHUB_CLIENT_ID,
  REACT_APP_GITHUB_CLIENT_SECRET,
} = process.env;

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
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

  clearUsers = async () => {
    this.setState(() => ({ users: [], loading: false }));
  };

  setAlert = (msg, type) => {
    this.setState(() => ({ alert: { msg, type } }));

    setTimeout(() => {
      this.setState(() => ({ alert: null }));
    }, 5000);
  };

  render() {
    const { users, loading, alert } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github" />

          <div className="container">
            <Alert alert={alert} />

            <Switch>
              <Route exact path="/">
                <Home
                  users={users}
                  loading={loading}
                  searchUser={this.searchUser}
                  clearUsers={this.clearUsers}
                  setAlert={this.setAlert}
                />
              </Route>

              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
