import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import './ErrorMessage.module.scss';

const ErrorMessage = ( { closeFunc, err } ) => {
  const status = err?.status ? err.status : null;
  const message = err?.message ? err.message : null;

  return (
    <Fragment>
      <div styleName="background" />
      <div styleName="container">
        <div styleName="error-background">
          <button aria-label="close error" onClick={ closeFunc } styleName="close-icon" type="button">
            <span className="dashicons dashicons-no" />
          </button>
          <strong styleName="heading">Unable to save changes</strong>
          <strong styleName="heading">We encountered the following error...</strong>
          <br />
          { status && <p styleName="message">{ status }</p> }
          { message && <p styleName="message">{ message }</p> }
          { !message && !status && <p>Sorry. No error message available</p> }
        </div>
      </div>
    </Fragment>
  );
};

ErrorMessage.propTypes = {
  closeFunc: propTypes.func,
  err: propTypes.object
};

export default ErrorMessage;
