import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';

import './FileUploader.module.scss';

const FileUploader = ({ label, name }) => {
  const { dispatch } = useContext(MetaboxContext);

  const handleFile = e => {
    const inputName = e.target.name;
    const file = e.target.files[0];

    dispatch({ type: 'file-add', payload: { file, name: inputName } });
  };

  return (
    <div>
      <label htmlFor="quote-box-image" styleName="label">
        {label}
        <input name={name} type="file" onChange={e => handleFile(e)} />
      </label>
    </div>
  );
};

FileUploader.propTypes = {
  label: propTypes.string,
  name: propTypes.string
};

FileUploader.defaultProps = {
  label: 'Upload a file:'
};

export default FileUploader;
