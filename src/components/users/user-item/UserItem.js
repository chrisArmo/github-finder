import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({ login, avatar_url }) => (
  <div className="card text-center">
    <img
      className="round-img"
      src={avatar_url}
      alt="profile avatar"
      style={{ width: '125px' }}
    />

    <h4>{login}</h4>

    <div>
      <Link className="btn btn-dark btn-sm my-1" to={`/user/${login}`}>
        See profile.
      </Link>
    </div>
  </div>
);

UserItem.propTypes = {
  login: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
};

export default UserItem;
