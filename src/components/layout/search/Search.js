import React, { useState, useContext } from 'react';

import AlertContext from '../../../context/alert/AlertContext';
import GithubContext from '../../../context/github/GithubContext';

const UserSearch = () => {
  const { users, searchUser, clearUsers } = useContext(GithubContext),
    { setAlert } = useContext(AlertContext);

  const [text, setText] = useState('');

  const changeInput = (e) => {
    const { value } = e.target;

    setText(() => value);
  };

  const submitForm = (e) => {
    e.preventDefault();

    const {
      target: {
        elements: {
          text: { value },
        },
      },
    } = e;

    if (value.trim() === '')
      return setAlert('Please enter username to search', 'danger');

    searchUser(e.target.elements.text.value);
    setText(() => '');
  };

  return (
    <div className="pt-1">
      <form onSubmit={submitForm} className="form my-2">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={changeInput}
        />

        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>

      {users.length ? (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      ) : null}
    </div>
  );
};

export default UserSearch;
