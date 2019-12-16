import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import { handleAdd, handleInput, handleRemove } from 'metabox/utils/modify-group';

import '../Forms.scss';

const ArticleById = ( { fields, inputs, updateState } ) => {
  const { articles } = inputs;

  if ( articles ) {
    return (
      <Fragment>
        <h4>Add Articles by Post ID:</h4>
        { articles.map( article => (
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
      </Fragment>
    );
  }

  return null;
};

ArticleById.propTypes = {
  fields: propTypes.array,
  inputs: propTypes.object,
  updateState: propTypes.func
};

export default ArticleById;
