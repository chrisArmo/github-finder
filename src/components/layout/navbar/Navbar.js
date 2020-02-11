import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navbar extends Component {
  static defaultProps = {
    title: 'Application Name',
    icon: 'fas fa-laptop-code',
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };

  render() {
    const { title, icon } = this.props;

    return (
      <nav className="navbar bg-primary">
        <h1>
          <i className={icon}></i> {title}
        </h1>
      </nav>
    );
  }
}

export default Navbar;
