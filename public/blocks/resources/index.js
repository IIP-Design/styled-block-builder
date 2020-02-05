import React from 'react';
import ReactDOM from 'react-dom';

import Resources from './Resources/Resources';

// Run accessibility tests in development.
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const axe = require('react-axe');

  axe(React, ReactDOM, 1000);
}

const divs = [...document.querySelectorAll('div[data-type="gpalab-resources"]')];

if (divs) {
  divs.forEach(div => {
    ReactDOM.render(<Resources id={div.dataset.id} />, div);
  });
}
