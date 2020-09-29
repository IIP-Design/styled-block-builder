import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';

import ErrorMessage from 'metabox/components/ErrorMessage/ErrorMessage';
import Wheel from 'metabox/components/Spinner/Wheel';

import { AdminContext } from 'metabox/context/adminContext';
import { handleLegacy } from 'metabox/utils/legacy';

import './MigrateLegacy.module.scss';

const migrationMessage = 'This post contains blocks built using an older version of the Styled Block Builder plugin. These blocks will no longer work unless they are converted. Please convert or delete them (note that existing shortcodes will need to be replaced):';

const MigrateLegacy = ( { parent } ) => {
  const [error, setError] = useState( false );
  const [errorData, setErrorData] = useState( null );
  const [migrating, setMigrating] = useState( false );

  const { dispatch, state } = useContext( AdminContext );

  const migrated = state?.migrated || false;
  const opacity = migrating ? { opacity: '0.1' } : { opacity: '1' };

  const initiateAction = async type => {
    const onComplete = ( res, action ) => {
      setMigrating( false );

      if ( action === 'convert' ) {
        dispatch( { type: 'legacy-convert', payload: res } );
      }

      dispatch( { type: 'migrated' } );
    };

    const onError = err => {
      setMigrating( false );
      setError( true );
      setErrorData( err );
    };

    setMigrating( true );

    await handleLegacy(
      parent,
      type,
      onComplete,
      onError,
    );
  };

  if ( !migrated ) {
    return (
      <div styleName="container">
        { migrating && (
          <div styleName="wheel-container">
            <Wheel />
          </div>
        ) }
        { error && <ErrorMessage closeFunc={ () => setError( false ) } err={ errorData } /> }
        <p style={ opacity }>
          <strong>{ 'Warning: ' }</strong>
          { migrationMessage }
        </p>
        <button
          className="button-secondary"
          disabled={ migrating }
          onClick={ () => initiateAction( 'convert' ) }
          styleName="button"
          type="button"
        >
          Convert Legacy Blocks
        </button>
        <button
          className="button-secondary"
          disabled={ migrating }
          onClick={ () => initiateAction( 'delete' ) }
          styleName="button"
          type="button"
        >
          Delete Legacy Blocks
        </button>
      </div>
    );
  }

  return null;
};

MigrateLegacy.propTypes = {
  parent: propTypes.string,
};

export default MigrateLegacy;
