import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Navbar from './components/layout/navbar/Navbar';
import UserList from './components/users/user-list/UserList';

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    try {
      this.setState(() => ({ loading: true }));

      const { data: users = [] } = await axios.get(
        'https://api.github.com/users',
      );

      this.setState(() => ({ users, loading: false }));
    } catch ({ message }) {
      console.log('error:', message);
    }
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />

        <div className="container">
          <UserList users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
