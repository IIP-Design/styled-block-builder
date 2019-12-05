import React from 'react';
import ReactDOM from 'react-dom';

import Text from './Text/Text';

const divs = [...document.querySelectorAll('div[data-type="gpalab-text"]')];

if (divs) {
  divs.forEach(div => {
    ReactDOM.render(<Text id={div.dataset.id} />, div);
  });
}
