import React, { Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import GithubContext from '../../../context/github/GithubContext';
import RepoList from '../../repos/repo-list/RepoList';
import Spinner from '../../layout/spinner/Spinner';

const User = ({ match }) => {
  const { user, repos, loading, getUser, getUserRepos } = useContext(
    GithubContext,
  );

  useEffect(() => {
    const {
      params: { login = null },
    } = match;

    getUser(login);
    getUserRepos(login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Search Again
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            alt="user avatar"
            style={{ width: '150px' }}
            className="round-img"
          />

          <h1>{name}</h1>

          <p>Location: {location}</p>
        </div>

        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>

              <p>{bio}</p>

              <a
                href={html_url}
                className="btn btn-dark my-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Github Profile
              </a>

              {(login || company || blog) && (
                <ul>
                  {login && (
                    <li>
                      <Fragment>
                        <strong>Username:</strong> {login}
                      </Fragment>
                    </li>
                  )}

                  {company && (
                    <li>
                      <Fragment>
                        <strong>Company:</strong> {company}
                      </Fragment>
                    </li>
                  )}

                  {blog && (
                    <li>
                      <Fragment>
                        <strong>Website:</strong> {blog}
                      </Fragment>
                    </li>
                  )}
                </ul>
              )}
            </Fragment>
          )}
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>

        <div className="badge badge-success">Following: {following}</div>

        <div className="badge badge-light">Public Repos: {public_repos}</div>

        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <RepoList repos={repos} />
    </Fragment>
  );
};

export default User;
