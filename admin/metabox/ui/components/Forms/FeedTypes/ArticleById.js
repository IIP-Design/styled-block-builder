import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import { handleAdd, handleInput, handleRemove } from 'metabox/utils/modify-group';

import './ArticleById.module.scss';

const ArticleById = ( { fields, inputs, updateState } ) => {
  const { articles } = inputs;

  if ( articles ) {
    return (
      <Fragment>
        <h4>Add Articles by Post ID:</h4>
        { articles.map( article => (
          <div styleName="feed-info" key={ article.id }>
            <label styleName="feed-label" htmlFor={ `article-id-${article.id}` }>
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
            <label styleName="feed-label" htmlFor={ `article-source-${article.id}` }>
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
              className="button-secondary"
              data-parent={ article.id }
              onClick={ e => handleRemove( articles, e.target.dataset.parent, updateState ) }
              styleName="feed-button-remove"
              type="button"
            >
              Remove Article
            </button>
          </div>
        ) ) }
        <button
          className="button-secondary"
          disabled={ articles && articles.length === 3 }
          onClick={ () => handleAdd( fields, inputs, 'articles', updateState ) }
          styleName="feed-button"
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
