import React, { Fragment } from 'react';

import spinner from './img/spinner.gif';

const Spinner = props => (
  <Fragment>
    <img
      src={spinner}
      alt="Loading..."
      style={{
        display: 'block',
        margin: 'auto',
        width: '200px',
      }}
    />
  </Fragment>
);

export default Spinner;
