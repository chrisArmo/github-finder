import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../layout/spinner/Spinner';
import UserItem from '../user-item/UserItem';

const UserList = ({ users, loading }) => {
  let display = (
    <div>
      <Spinner />
    </div>
  );

  if (!loading) {
    if (users.length)
      display = (
        <div style={userListStyles}>
          {users.map(user => (
            <UserItem key={user.id} {...user} />
          ))}
        </div>
      );
    else
      display = (
        <div
          style={{
            fontSize: '2rem',
            marginTop: '20px',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          No Users.
        </div>
      );
  }

  return <Fragment>{display}</Fragment>;
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const userListStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default UserList;
