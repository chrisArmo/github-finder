import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({ login, avatar_url, html_url }) => (
  <div className="card text-center">
    <img
      className="round-img"
      src={avatar_url}
      alt="profile avatar"
      style={{ width: '125px' }}
    />

    <h4>{login}</h4>

    <div>
      <a className="btn btn-dark btn-sm my-1" href={html_url}>
        See profile.
      </a>
    </div>
  </div>
);

UserItem.propTypes = {
  login: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
};

export default UserItem;
