import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import FullWidthToggle from './Toggles/FullWidthToggle';

import './Forms.scss';

const QuoteBoxForm = ( { callback, meta } ) => {
  const schema = {
    desc: meta.desc || '',
    fullWidth: meta.fullWidth || false,
    quote: meta.quote || '',
    speaker: meta.speaker || '',
    subtitle: meta.subtitle || '',
    title: meta.title || ''
  };

  const [inputs, setInputs] = useState( schema );

  const formData = { ...inputs };

  // Initialize the state on first render, otherwise will submit empty values if saved without making changes
  useEffect( () => {
    callback( formData );
  }, [] );

  const handleChange = e => {
    const { name, value } = e.target;

    setInputs( { ...inputs, [name]: value } );
    callback( { ...formData, [name]: value } );
  };

  const handleToggle = () => {
    const checked = !inputs.fullWidth;

    setInputs( { ...inputs, fullWidth: checked } );
    callback( { ...formData, fullWidth: checked } );
  };

  return (
    <form className="gpalab-modal-form">
      <h3 className="gpalab-modal-form-title">Configure Your Quote Box:</h3>
      <label htmlFor="quote-box-title">
        Add title:
        <input
          id="quote-box-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.title }
        />
      </label>
      <label htmlFor="quote-box-subtitle">
        Add sub-title:
        <input
          id="quote-box-subtitle"
          name="subtitle"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.subtitle }
        />
      </label>
      <label htmlFor="quote-box-desc">
        Add description:
        <textarea
          id="quote-box-desc"
          name="desc"
          onChange={ e => handleChange( e ) }
          rows="6"
          value={ inputs.desc }
        />
      </label>
      <label htmlFor="quote-box-quote">
        Add quote:
        <textarea
          id="quote-box-quote"
          name="quote"
          onChange={ e => handleChange( e ) }
          rows="6"
          value={ inputs.quote }
        />
      </label>
      <label htmlFor="quote-box-speaker">
        Add speaker:
        <input
          id="quote-box-speaker"
          name="speaker"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ inputs.speaker }
        />
      </label>
      <FullWidthToggle callback={ handleToggle } checked={ inputs.fullWidth } />
    </form>
  );
};

QuoteBoxForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default QuoteBoxForm;
