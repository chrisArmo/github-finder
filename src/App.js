import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import AlertState from './context/alert/AlertState';
import GithubState from './context/github/GithubState';

import About from './components/pages/about/About';
import Alert from './components/layout/alert/Alert';
import Home from './components/pages/home/Home';
import Navbar from './components/layout/navbar/Navbar';
import NotFound from './components/pages/notfound/NotFound';
import User from './components/users/user/User';

const App = () => {
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon="fab fa-github" />

          <div className="container">
            <AlertState>
              <Alert alert={alert} />

              <Switch>
                <Route exact path="/" component={Home} />

                <Route exact path="/about" component={About} />

                <Route exact path="/user/:login" component={User} />

                <Route component={NotFound} />
              </Switch>
            </AlertState>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
