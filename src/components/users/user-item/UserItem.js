import React from 'react';

const UserItem = ({ id, login, avatar_url, html_url }) => {
  return (
    <div className="card text-center">
      <img
        className="round-img"
        src={avatar_url}
        alt="profile avatar"
        style={{ width: '150px' }}
      />

      <h4>{login}</h4>

      <div>
        <a
          className="btn btn-dark btn-sm my-1"
          href={html_url}
          target="_blank"
        >
          See profile.
        </a>
      </div>
    </div>
  );
};

export default UserItem;
