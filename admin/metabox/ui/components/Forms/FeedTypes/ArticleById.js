import React, { Fragment, useContext } from 'react';
import propTypes from 'prop-types';

import { AdminContext } from 'metabox/context/adminContext';

import './ArticleById.module.scss';

const ArticleById = ({ parentGroup, parentId }) => {
  const { dispatch, state } = useContext(AdminContext);
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const handleAdd = () => {
    const fields = [{ name: 'postId' }, { name: 'source' }];

    if (parentGroup) {
      dispatch({
        type: 'group-add-nested',
        payload: { fields, group: 'articles', parentGroup, parentId }
      });
    } else {
      dispatch({ type: 'group-add', payload: { fields, group: 'articles' } });
    }
  };

  const handleChange = e => {
    const { itemid } = e.target.dataset;
    const { name, value } = e.target;

    if (parentGroup) {
      dispatch({
        type: 'group-input-nested',
        payload: { itemId: itemid, group: 'articles', name, parentGroup, parentId, value }
      });
    } else {
      dispatch({
        type: 'group-input',
        payload: { itemId: itemid, group: 'articles', name, value }
      });
    }
  };

  const handleRemove = e => {
    const { itemid } = e.target.dataset;

    if (parentGroup) {
      dispatch({
        type: 'group-remove-nested',
        payload: { itemId: itemid, group: 'articles', parentGroup, parentId }
      });
    } else {
      dispatch({ type: 'group-remove', payload: { group: 'articles', id: itemid } });
    }
  };

  if (formValues) {
    let articles;
    if (!parentGroup) {
      articles = formValues.articles || [];
    } else {
      const group = formValues[parentGroup] || [];
      const current = group.filter(item => item.id === parentId)[0];
      articles = current.articles || [];
    }

    return (
      <Fragment>
        <h4>Add Articles by Post ID:</h4>
        {articles.map(article => (
          <div key={article.id} styleName="feed-info">
            <label htmlFor={`article-id-${article.id}`} styleName="feed-label">
              Enter article id
              <input
                data-itemid={article.id}
                id={`article-id-${article.id}`}
                name="postId"
                type="text"
                value={article.postId || ''}
                onChange={e => handleChange(e)}
              />
            </label>
            <label htmlFor={`article-source-${article.id}`} styleName="feed-label">
              Select article source
              <select
                data-itemid={article.id}
                id={`article-source-${article.id}`}
                name="source"
                value={article.source}
                onBlur={e => handleChange(e)}
                onChange={e => handleChange(e)}
              >
                <option value="">- Select Source -</option>
                <option value="share">Share America</option>
                <option value="yali">YALI</option>
                <option value="ylai">YLAI</option>
              </select>
            </label>
            <button
              className="button-secondary"
              data-itemid={article.id}
              styleName="feed-button-remove"
              type="button"
              onClick={e => handleRemove(e)}
            >
              Remove Article
            </button>
          </div>
        ))}
        <button
          className="button-secondary"
          disabled={articles && articles.length === 3}
          styleName="feed-button"
          type="button"
          onClick={() => handleAdd()}
        >
          Add Article
        </button>
      </Fragment>
    );
  }

  return null;
};

ArticleById.propTypes = {
  parentGroup: propTypes.string,
  parentId: propTypes.string
};

ArticleById.defaultProps = {
  parentGroup: null,
  parentId: null
};

export default ArticleById;
