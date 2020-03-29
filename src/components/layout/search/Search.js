import React, { useState } from 'react';
import PropTypes from 'prop-types';

// TODO: finish refactoring user search
const UserSearch = ({ showClear, searchInput, clearInput, setAlert }) => {
  const [text, setText] = useState('');

  const changeInput = e => {
    const { value } = e.target;

    setText(() => value);
  };

  const clearData = () => clearInput();

  const submitForm = e => {
    e.preventDefault();

    const {
      target: {
        elements: {
          text: { value },
        },
      },
    } = e;

    if (value.trim() === '')
      return setAlert('Please enter text to search', 'light');

    searchInput(e.target.elements.text.value);
    setText(() => '');
  };

  return (
    <div>
      <form onSubmit={submitForm} className="form">
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

      {showClear ? (
        <button className="btn btn-light btn-block" onClick={clearData}>
          Clear
        </button>
      ) : null}
    </div>
  );
};

UserSearch.propTypes = {
  searchInput: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default UserSearch;
