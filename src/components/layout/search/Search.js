import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserSearch extends Component {
  state = {
    text: '',
  };

  static propTypes = {
    searchInput: PropTypes.func.isRequired,
    clearInput: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  changeInput = e => {
    const { name, value } = e.target;

    this.setState(() => ({ [name]: value }));
  };

  clearData = () => {
    const { clearInput } = this.props;

    clearInput();
  };

  submitForm = e => {
    e.preventDefault();

    const {
      target: {
        elements: {
          text: { value },
        },
      },
    } = e;

    if (value.trim() === '')
      return this.props.setAlert('Please enter text to search', 'light');

    const { searchInput } = this.props;

    searchInput(e.target.elements.text.value);
    this.setState(() => ({ text: '' }));
  };

  render() {
    const {
      props: { showClear },
      state: { text },
    } = this;

    return (
      <div>
        <form onSubmit={this.submitForm} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={text}
            onChange={this.changeInput}
          />

          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>

        {showClear ? (
          <button className="btn btn-light btn-block" onClick={this.clearData}>
            Clear
          </button>
        ) : null}
      </div>
    );
  }
}

export default UserSearch;
