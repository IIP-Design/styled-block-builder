import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';

import './FileUploader.module.scss';

const FileUploader = ({ current, label, name, parentGroup, parentId }) => {
  const { dispatch } = useContext(AdminContext);

  const handleFile = e => {
    const inputName = e.target.name;
    const file = e.target.files[0];

    if (parentGroup) {
      dispatch({
        type: 'file-add-nested',
        payload: { file, name: inputName, parentGroup, parentId }
      });
    } else {
      dispatch({ type: 'file-add', payload: { file, name: inputName } });
    }
  };

  return (
    <label htmlFor="quote-box-image" styleName="label">
      {label}
      {current && (
        <div styleName="existing-file">
          <p>
            <strong>Current image: </strong>
            {current.filename}
          </p>
          <button styleName="button" type="button">
            Remove This File
          </button>
        </div>
      )}
      {!current && <input name={name} type="file" onChange={e => handleFile(e)} />}
    </label>
  );
};

FileUploader.propTypes = {
  current: propTypes.object,
  label: propTypes.string,
  name: propTypes.string,
  parentGroup: propTypes.string,
  parentId: propTypes.string
};

FileUploader.defaultProps = {
  current: null,
  label: 'Upload a file:',
  parentGroup: null,
  parentId: null
};

export default FileUploader;
