import React, { Fragment } from 'react';
import Search from '../../layout/search/Search';
import UserList from '../../users/user-list/UserList';

const Home = () => {
  return (
    <Fragment>
      <Search />

      <UserList />
    </Fragment>
  );
};

export default Home;
