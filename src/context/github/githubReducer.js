import {
  SEARCH_USER,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SET_LOADING,
} from './githubActions';

export default (state, { type, payload }) => {
  switch (type) {
    case SEARCH_USER:
      const { users } = payload;

      return {
        ...state,
        users,
        loading: false,
      };

    case CLEAR_USERS:
      return { ...state, users: [], loading: false };

    case GET_REPOS:
      const { repos } = payload;

      return { ...state, repos, loading: false };

    case GET_USER:
      const { user } = payload;

      return { ...state, user, loading: false };

    case SET_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
};
