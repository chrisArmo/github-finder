import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => (
  <nav className="navbar bg-primary">
    <h1>
      <i className={icon}></i> {title}
    </h1>
  </nav>
);

Navbar.defaultProps = {
  title: 'Application Name',
  icon: 'fas fa-laptop-code',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
