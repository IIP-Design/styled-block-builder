import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

// import RadioConditional from './Toggles/RadioConditional';

import ArticleById from './FeedTypes/ArticleById';

const ArticleFeedForm = ( { callback, meta } ) => {
  const schema = {
    articles: meta.articles || [],
    type: meta.type || 'byId'
  };

  const [inputs, setInputs] = useState( schema );

  const formData = { ...inputs };

  // Initialize the state on first render, otherwise will submit empty values if saved without making changes
  useEffect( () => {
    callback( formData );
  }, [] );

  const updateState = clone => {
    setInputs( { ...inputs, articles: clone } );
    callback( { ...formData, articles: clone } );
  };

  // const handleToggle = () => {
  //   const checked = !inputs.type;

  //   setInputs( { ...inputs, type: checked } );
  //   callback( { ...formData, type: checked } );
  // };

  return (
    <Fragment>
      { /* <RadioConditional
        callback={ handleToggle }
        checked={ inputs.type }
        label="Add a feed of articles?"
      > */ }
      <ArticleById inputs={ inputs } updateState={ updateState } />
      { /* </RadioConditional> */ }
    </Fragment>
  );
};

ArticleFeedForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default ArticleFeedForm;
