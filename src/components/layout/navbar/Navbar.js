import React, { Component } from 'react';

class Navbar extends Component {
  static defaultProps = {
    title: 'Application Name',
    icon: 'fas fa-laptop-code',
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
