import React, { Fragment, useContext } from 'react';

import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';

import './ArticleById.module.scss';

const ArticleById = () => {
  const { dispatch, state } = useContext(MetaboxContext);
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const fields = [{ name: 'postId' }, { name: 'source' }];

  const handleChange = e => {
    const { parent } = e.target.dataset;
    const { name, value } = e.target;

    dispatch({ type: 'group-input', payload: { group: 'articles', name, parent, value } });
  };

  const handleRemove = e => {
    const { parent } = e.target.dataset;

    dispatch({ type: 'group-remove', payload: { group: 'articles', id: parent } });
  };

  if (formValues) {
    const articles = formValues.articles || [];

    return (
      <Fragment>
        <h4>Add Articles by Post ID:</h4>
        {articles.map(article => (
          <div key={article.id} styleName="feed-info">
            <label htmlFor={`article-id-${article.id}`} styleName="feed-label">
              Enter article id
              <input
                data-parent={article.id}
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
                data-parent={article.id}
                id={`article-source-${article.id}`}
                name="source"
                value={article.source}
                onBlur={e => handleChange(e)}
                onChange={e => handleChange(e)}
              >
                <option value="">- Select Source -</option>
                <option value="share">Share America</option>
                <option value="yali">YALI</option>
                <option value="yali">YLAI</option>
              </select>
            </label>
            <button
              className="button-secondary"
              data-parent={article.id}
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
          onClick={() => dispatch({ type: 'group-add', payload: { fields, group: 'articles' } })}
        >
          Add Article
        </button>
      </Fragment>
    );
  }

  return null;
};

export default ArticleById;
