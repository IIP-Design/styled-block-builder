import React from 'react';
import propTypes from 'prop-types';

import './FileUploader.module.scss';

const FileUploader = ( { callback, label, name } ) => (
  <div>
    <label htmlFor="quote-box-image" styleName="label">
      { label }
      <input name={ name } onChange={ e => callback( e ) } type="file" />
    </label>
  </div>
);

FileUploader.propTypes = {
  callback: propTypes.func,
  label: propTypes.string,
  name: propTypes.string
};

FileUploader.defaultProps = {
  label: 'Upload a file:'
};

export default FileUploader;
