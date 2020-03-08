import React, { Fragment } from 'react';
import Search from '../../layout/search/Search';
import UserList from '../../users/user-list/UserList';

const Home = ({ users, loading, searchUser, clearUsers, setAlert }) => {
  return (
    <Fragment>
      <Search
        showClear={users.length > 0}
        searchInput={searchUser}
        clearInput={clearUsers}
        setAlert={setAlert}
      />

      <UserList users={users} loading={loading} />
    </Fragment>
  );
};

export default Home;
