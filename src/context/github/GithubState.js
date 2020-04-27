import React, { useReducer } from 'react';
import axios from 'axios';

import GithubContext from './GithubContext';
import githubReducer from './githubReducer';
import {
  SEARCH_USER,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SET_LOADING,
} from './githubActions';

const { NODE_ENV } = process.env;

let GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET;

if (NODE_ENV !== 'production') {
  GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  GITHUB_CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
      users: [],
      user: {},
      repos: [],
      loading: false,
    },
    [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUser = async (username) => {
    try {
      setLoading();

      const {
        data: { items: users = [] },
      } = await axios.get(
        `https://api.github.com/search/users?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&q=${username}`,
      );

      dispatch({ type: SEARCH_USER, payload: { users } });
    } catch ({ message }) {
      console.log('error:', message);
    }
  };

  const getUser = async (login) => {
    setLoading();

    const { data: user } = await axios.get(
      `https://api.github.com/users/${login}?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&q=${login}`,
    );

    dispatch({ type: GET_USER, payload: { user } });
  };

  const getUserRepos = async (login) => {
    setLoading();

    const { data: repos } = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&q=${login}`,
    );

    dispatch({ type: GET_REPOS, payload: { repos } });
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUser,
        getUser,
        getUserRepos,
        clearUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
