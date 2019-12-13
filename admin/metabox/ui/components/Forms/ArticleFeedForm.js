import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { handleAdd, handleInput, handleRemove } from 'metabox/utils/modify-group';
// import RadioConditional from './Toggles/RadioConditional';

import './Forms.scss';

const ArticleFeedForm = ( { callback, meta } ) => {
  const schema = {
    articles: meta.articles || [],
    type: meta.type || 'byId'
  };

  const [inputs, setInputs] = useState( schema );

  const formData = { ...inputs };
  const { articles } = inputs;

  // Initialize the state on first render, otherwise will submit empty values if saved without making changes
  useEffect( () => {
    callback( formData );
  }, [] );

  const updateState = clone => {
    setInputs( { ...inputs, articles: clone } );
    callback( { ...formData, articles: clone } );
  };

  // const handleRemove = e => {
  //   const { parent } = e.target.dataset;

  //   const selected = articles.filter( article => article.id === parent );
  //   const index = articles.indexOf( selected[0] );

  //   // Replicate resources array and add new resource object
  //   const clone = [...articles];
  //   clone.splice( index, 1 );

  //   updateState( clone );
  // };

  // const handleToggle = () => {
  //   const checked = !inputs.type;

  //   setInputs( { ...inputs, type: checked } );
  //   callback( { ...formData, type: checked } );
  // };

  const fields = [{ name: 'postId' }, { name: 'source' }];

  return (
    <form className="gpalab-modal-form">
      <h3 className="gpalab-modal-form-title">Configure Your Article Feed:</h3>
      { /* <RadioConditional
        callback={ handleToggle }
        checked={ inputs.type }
        label="Add a feed of articles?"
      > */ }
      <h4>Add Articles by Post ID:</h4>
      { articles &&
        articles.map( article => (
          <div className="article-feed-info" key={ article.id }>
            <label className="article-feed-label" htmlFor={ `article-id-${article.id}` }>
              Enter article id
              <input
                data-parent={ article.id }
                id={ `article-id-${article.id}` }
                name="postId"
                onChange={ e => handleInput( e, articles, updateState ) }
                type="text"
                value={ article.postId }
              />
            </label>
            <label className="article-feed-label" htmlFor={ `article-source-${article.id}` }>
              Select article source
              <select
                data-parent={ article.id }
                id={ `article-source-${article.id}` }
                name="source"
                onChange={ e => handleInput( e, articles, updateState ) }
                value={ article.source }
              >
                <option value="">- Select Source -</option>
                <option value="share">Share America</option>
                <option value="yali">YALI</option>
                <option value="yali">YLAI</option>
              </select>
            </label>
            <button
              className="button-secondary article-feed-button-remove"
              data-parent={ article.id }
              onClick={ e => handleRemove( articles, e.target.dataset.parent, updateState ) }
              type="button"
            >
              Remove Article
            </button>
          </div>
        ) ) }
      <button
        className="button-secondary article-feed-button"
        disabled={ articles && articles.length === 3 }
        onClick={ () => handleAdd( fields, inputs, 'articles', updateState ) }
        type="button"
      >
        Add Article
      </button>
      { /* </RadioConditional> */ }
    </form>
  );
};

ArticleFeedForm.propTypes = {
  callback: propTypes.func,
  meta: propTypes.object
};

export default ArticleFeedForm;
