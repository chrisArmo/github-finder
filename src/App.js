import React, { Component } from 'react';

import './App.css';

import Navbar from './components/layout/navbar/Navbar';
import UserList from './components/users/user-list/UserList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github" />

        <div className="container">
          <UserList />
        </div>
      </div>
    );
  }
}

export default App;
