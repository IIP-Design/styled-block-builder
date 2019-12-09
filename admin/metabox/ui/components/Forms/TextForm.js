import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import './Forms.scss';

const TextForm = ( { callback, meta } ) => {
  const [button, setButton] = useState( meta.button || '' );
  const [color, setColor] = useState( meta.color || '' );
  const [desc, setDesc] = useState( meta.desc || '' );
  const [link, setLink] = useState( meta.link || '' );
  const [style, setStyle] = useState( meta.style || '' );
  const [subtitle, setSubtitle] = useState( meta.subtitle || '' );
  const [title, setTitle] = useState( meta.title || '' );

  const formData = {
    button,
    color,
    desc,
    link,
    style,
    subtitle,
    title
  };

  // Initialize the state on first render, otherwise will submit empty values if saved without making changes
  useEffect( () => {
    callback( formData );
  }, [] );

  const handleChange = e => {
    const { name, value } = e.target;

    switch ( name ) {
      case 'button':
        setButton( value );
        callback( { ...formData, button: value } );
        break;
      case 'color':
        setColor( value );
        callback( { ...formData, color: value } );
        break;
      case 'desc':
        setDesc( value );
        callback( { ...formData, desc: value } );
        break;
      case 'link':
        setLink( value );
        callback( { ...formData, link: value } );
        break;
      case 'style':
        setStyle( value );
        callback( { ...formData, style: value } );
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
      <h3 className="gpalab-modal-form-title">Configure Your Text Block:</h3>
      <label htmlFor="text-title">
        Add title:
        <input
          id="text-title"
          name="title"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ title }
        />
      </label>
      <label htmlFor="text-subtitle">
        Add sub-title:
        <input
          id="text-subtitle"
          name="subtitle"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ subtitle }
        />
      </label>
      <label htmlFor="text-desc">
        Add description:
        <textarea
          id="text-desc"
          name="desc"
          onChange={ e => handleChange( e ) }
          rows="6"
          value={ desc }
        />
      </label>
      <label htmlFor="text-button">
        Add button text:
        <input
          id="text-button"
          name="button"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ button }
        />
      </label>
      <label htmlFor="text-button-link">
        Add button link:
        <input
          id="text-button-link"
          name="link"
          onChange={ e => handleChange( e ) }
          type="text"
          value={ link }
        />
      </label>

      <label htmlFor="text-button-style">
        Select Button Style:
        <select
          id="text-button-style"
          name="style"
          onChange={ e => handleChange( e ) }
          type="select"
          value={ style }
        >
          <option value="minimal">Minimal</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
      </label>
      <label htmlFor="text-arrow-color">
        Select Button Arrow Color:
        <select
          id="text-arrow-color"
          name="color"
          onChange={ e => handleChange( e ) }
          type="select"
          value={ color }
        >
          <option value="white">White</option>
          <option value="red">Red</option>
        </select>
      </label>
    </form>
  );
};

TextForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default TextForm;
