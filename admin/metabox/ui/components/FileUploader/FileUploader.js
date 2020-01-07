import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';

import './FileUploader.module.scss';

const FileUploader = ({ label, name, parentGroup, parentId }) => {
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
  name: propTypes.string,
  parentGroup: propTypes.string,
  parentId: propTypes.string
};

FileUploader.defaultProps = {
  label: 'Upload a file:',
  parentGroup: null,
  parentId: null
};

export default FileUploader;
