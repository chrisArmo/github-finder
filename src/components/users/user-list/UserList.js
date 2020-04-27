import React, { Fragment, useContext } from 'react';

import GithubContext from '../../../context/github/GithubContext';
import Spinner from '../../layout/spinner/Spinner';
import UserItem from '../user-item/UserItem';

const UserList = () => {
  const { users, loading } = useContext(GithubContext);

  let display = (
    <div>
      <Spinner />
    </div>
  );

  if (!loading) {
    if (users.length)
      display = (
        <div style={userListStyles}>
          {users.map((user) => (
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
          No Users To Display
        </div>
      );
  }

  return <Fragment>{display}</Fragment>;
};

const userListStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default UserList;
