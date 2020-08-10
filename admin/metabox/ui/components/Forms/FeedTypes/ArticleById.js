import React, { useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';
import { getFeedOptions } from 'metabox/utils/feed-options';
import {
  handleAddNested,
  handleChangeNested,
  handleRemoveNested,
} from 'metabox/utils/event-handlers';

import './ArticleById.module.scss';

const ArticleById = ( { parentGroup, parentId } ) => {
  const { dispatch, state } = useContext( AdminContext );
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const { feedOptions } = window?.gpalabBlockAdmin;

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
        { articles.map( article => (
          <div key={ article.id } styleName="form">
            <strong styleName="title">Add Article Data:</strong>
            <label htmlFor={ `article-id-${article.id}` }>
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
            <label htmlFor={ `article-source-${article.id}` }>
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
                { feedOptions && getFeedOptions( feedOptions ) }
              </select>
            </label>
            <button
              className="button-secondary"
              data-itemid={ article.id }
              styleName="button-remove"
              type="button"
              onClick={ e => handleRemoveNested( e, dispatch, 'articles', parentGroup, parentId ) }
            >
              Remove Article
            </button>
          </div>
        ) ) }
        <button
          className="button-secondary"
          style={ articles && articles.length > 5 ? { display: 'none' } : { display: 'block' } }
          styleName="button-add"
          type="button"
          onClick={ () => handleAddNested( dispatch, fields, 'articles', parentGroup, parentId ) }
        >
          { articles.length === 0 ? 'Add An Article' : 'Add Another Article' }
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
