import React from 'react';

import './Forms.scss';

const QuoteBoxForm = () => (
  <form className="gpalab-modal-form">
    <h3 className="gpalab-modal-form-title">Configure Your Quote Box:</h3>
    <label htmlFor="quote-box-title">
      Add title:
      <input id="quote-box-title" type="text" />
    </label>
    <label htmlFor="quote-box-subtitle">
      Add sub-title:
      <input id="quote-box-subtitle" type="text" />
    </label>
    <label htmlFor="quote-box-desc">
      Add description:
      <textarea id="quote-box-desc" rows="6" />
    </label>
    <label htmlFor="quote-box-quote">
      Add quote:
      <textarea id="quote-box-quote" rows="6" />
    </label>
  </form>
);

export default QuoteBoxForm;
