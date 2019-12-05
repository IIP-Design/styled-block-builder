import React, { useState } from 'react';
import propTypes from 'prop-types';

import './Forms.scss';

const QuoteBoxForm = ( { callback } ) => {
  const [desc, setDesc] = useState( '' );
  const [quote, setQuote] = useState( '' );
  const [speaker, setSpeaker] = useState( '' );
  const [subtitle, setSubtitle] = useState( '' );
  const [title, setTitle] = useState( '' );

  const handleChange = e => {
    const { name, value } = e.target;

    const formData = {
      desc,
      quote,
      speaker,
      subtitle,
      title
    };

    switch ( name ) {
      case 'desc':
        setDesc( value );
        callback( { ...formData, desc: value } );
        break;
      case 'quote':
        setQuote( value );
        callback( { ...formData, quote: value } );
        break;
      case 'speaker':
        setSpeaker( value );
        callback( { ...formData, speaker: value } );
        break;
      case 'subtitle':
        setSubtitle( value );
        callback( { ...formData, subtitle: value } );
        break;
      case 'title':
        setTitle( value );
        callback( { ...formData, title: value } );
        break;
      default:
    }
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
          value={ title }
        />
      </label>
      <label htmlFor="quote-box-subtitle">
        Add sub-title:
        <input
          id="quote-box-subtitle"
          name="subtitle"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ subtitle }
        />
      </label>
      <label htmlFor="quote-box-desc">
        Add description:
        <textarea
          id="quote-box-desc"
          name="desc"
          onChange={ e => handleChange( e ) }
          rows="6"
          value={ desc }
        />
      </label>
      <label htmlFor="quote-box-quote">
        Add quote:
        <textarea
          id="quote-box-quote"
          name="quote"
          onChange={ e => handleChange( e ) }
          rows="6"
          value={ quote }
        />
      </label>
      <label htmlFor="quote-box-speaker">
        Add speaker:
        <input
          id="quote-box-speaker"
          name="speaker"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ speaker }
        />
      </label>
    </form>
  );
};

QuoteBoxForm.propTypes = {
  callback: propTypes.func
};

export default QuoteBoxForm;
