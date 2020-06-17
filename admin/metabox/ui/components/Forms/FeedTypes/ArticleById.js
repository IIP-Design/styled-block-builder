import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';
import {
  handleAddNested,
  handleChangeNested,
  handleRemoveNested,
} from 'metabox/utils/event-handlers';

import './ArticleById.module.scss';

const ArticleById = ( { parentGroup, parentId } ) => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const fields = [{ name: 'postId' }, { name: 'source' }];

  if ( formValues ) {
    let articles;

    if ( !parentGroup ) {
      articles = formValues.articles || [];
    } else {
      const group = formValues[parentGroup] || [];
      const current = group.filter( item => item.id === parentId )[0];

      articles = current.articles || [];
    }

    return (
      <div styleName="container">
        <h4 styleName="title">Add Articles by Post ID:</h4>
        { articles.map( article => (
          <div key={ article.id } styleName="feed-info">
            <label htmlFor={ `article-id-${article.id}` } styleName="feed-label">
              Enter article id
              <input
                data-itemid={ article.id }
                id={ `article-id-${article.id}` }
                name="postId"
                type="text"
                value={ article.postId || '' }
                onChange={ e => handleChangeNested( e, dispatch, 'articles', parentGroup, parentId ) }
              />
            </label>
            <label htmlFor={ `article-source-${article.id}` } styleName="feed-label">
              Select article source
              <select
                data-itemid={ article.id }
                id={ `article-source-${article.id}` }
                name="source"
                value={ article.source }
                onBlur={ e => handleChangeNested( e, dispatch, 'articles', parentGroup, parentId ) }
                onChange={ e => handleChangeNested( e, dispatch, 'articles', parentGroup, parentId ) }
              >
                <option value="">- Select Source -</option>
                <option value="share">Share America</option>
                <option value="yali">YALI</option>
                <option value="ylai">YLAI</option>
              </select>
            </label>
            <button
              className="button-secondary"
              data-itemid={ article.id }
              styleName="feed-button-remove"
              type="button"
              onClick={ e => handleRemoveNested( e, dispatch, 'articles', parentGroup, parentId ) }
            >
              Remove Article
            </button>
          </div>
        ) ) }
        <button
          className="button-secondary"
          disabled={ articles && articles.length === 3 }
          styleName="feed-button"
          type="button"
          onClick={ () => handleAddNested( dispatch, fields, 'articles', parentGroup, parentId ) }
        >
          Add Article
        </button>
      </div>
    );
  }

  return null;
};

ArticleById.propTypes = {
  parentGroup: propTypes.string,
  parentId: propTypes.string,
};

ArticleById.defaultProps = {
  parentGroup: null,
  parentId: null,
};

export default ArticleById;
