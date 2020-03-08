import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Alert from './components/layout/alert/Alert';
import Navbar from './components/layout/navbar/Navbar';
import Search from './components/layout/search/Search';
import UserList from './components/users/user-list/UserList';

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
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />

        <div className="container">
          <Alert alert={alert} />

          <Search
            showClear={users.length > 0}
            searchInput={this.searchUser}
            clearInput={this.clearUsers}
            setAlert={this.setAlert}
          />

          <UserList users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
