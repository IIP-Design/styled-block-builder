import React, { Fragment, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { getTabTitleField, responsiveTitle } from 'metabox/utils/tab-titles';
import { handleAdd, handleInput, handleRemove } from 'metabox/utils/modify-group';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import ArticleById from '../FeedTypes/ArticleById';
import CheckboxConditional from '../Toggles/CheckboxConditional';

import './TabbedForm.module.scss';

const TabbedForm = ({ fields, group, inputs, label, maxTabs, stateFunc }) => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const currentState = [...inputs[group]];
    setForms(currentState);

    // If forms already present, open first one
    if (currentState.length > 0) {
      setSelectedTab(currentState[0].id);
    }
  }, []);

  const updateState = (val, index) => {
    stateFunc(group, val);
    setForms(val);

    if (index) {
      setSelectedTab(index);
    }
  };

  const updateArticles = val => {
    const newState = [...forms];

    newState.map(item => {
      if (item.id === val[0].parent) {
        item.articles = val;
      }

      return item;
    });

    updateState(newState);
  };

  const handleFile = e => {
    const { name } = e.target;
    const file = e.target.files[0];

    const files = inputs.files.filter(f => f.name !== name);
    files.push({ name, file });

    updateState('files', files);
  };

  const uponRemoval = (clone, index) => {
    // Bring adjacent tab in focus when removing tab
    let tab;
    switch (clone.length) {
      case 0:
        tab = null;
        break;
      default:
        if (index === 0) {
          tab = forms[1].id;
        } else if (index > 0) {
          tab = forms[index - 1].id;
        }
    }

    // Handles all the state updates
    updateState(clone, tab);
  };

  const handleToggle = e => {
    const parent = e.target.name;

    // Make an updated replica of the form objects
    const newState = [...forms];
    newState.map(item => {
      if (item.id === parent) {
        const checked = item.hasFeed;
        item.hasFeed = !checked;

        item.articles = item.articles ? item.articles : [];
      }

      return item;
    });

    updateState(newState);
  };

  return (
    <div>
      <div styleName="tabbed-form">
        {forms && forms.length > 0 && (
          <Fragment>
            <div styleName="tabs">
              {forms.map((form, index) => {
                const selected = forms.filter(base => base.id === form.id);
                return (
                  <button
                    id={`tab-${index}`}
                    key={`tab-${form.id}`}
                    onClick={() => setSelectedTab(form.id)}
                    styleName={selectedTab === form.id ? 'tab selected-tab' : 'tab'}
                    type="button"
                  >
                    {responsiveTitle(index, forms.length, selected[0][getTabTitleField(fields)])}
                  </button>
                );
              })}
            </div>
            <div className="tab-container">
              {forms.map(form => {
                const selected = forms.filter(base => base.id === form.id);
                return (
                  <div
                    id={`tab-item-${form.id}`}
                    key={`tab-item-${form.id}`}
                    styleName={selectedTab === form.id ? 'tab-item selected-item' : 'tab-item'}
                  >
                    {fields &&
                      fields.map(field => {
                        if (field.type === 'image') {
                          return (
                            <FileUploader
                              callback={handleFile}
                              label="Add background image:"
                              name="backgroundImage"
                            />
                          );
                        }

                        if (field.type === 'text') {
                          return (
                            <label
                              htmlFor={`section-${field.name}-${form.id}`}
                              key={`${field.name}-${form.id}`}
                            >
                              {field.label || ''}
                              <input
                                id={`section-${field.name}-${form.id}`}
                                data-parent={form.id}
                                name={field.name}
                                onChange={e => handleInput(e, forms, updateState)}
                                type="text"
                                value={selected[0][field.name]}
                              />
                            </label>
                          );
                        }

                        if (field.type === 'textarea') {
                          return (
                            <label
                              htmlFor={`section-${field.name}-${form.id}`}
                              key={`${field.name}-${form.id}`}
                            >
                              {field.label || ''}
                              <textarea
                                id={`section-${field.name}-${form.id}`}
                                data-parent={form.id}
                                name={field.name}
                                onChange={e => handleInput(e, forms, updateState)}
                                rows="6"
                                value={selected[0][field.name]}
                              />
                            </label>
                          );
                        }

                        if (field.type === 'article-feed') {
                          return (
                            <CheckboxConditional
                              callback={handleToggle}
                              checked={form.hasFeed}
                              data-parent={form.id}
                              key={`${field.name}-${form.id}`}
                              label={field.label || ''}
                              name={form.id}
                            >
                              <ArticleById inputs={form} updateState={updateArticles} />
                            </CheckboxConditional>
                          );
                        }

                        return null;
                      })}
                  </div>
                );
              })}
            </div>
          </Fragment>
        )}
        <div
          style={{ justifyContent: forms && forms.length > 0 ? 'space-between' : 'flex-end' }}
          styleName="tab-buttons"
        >
          {forms && forms.length > 0 && (
            <button
              className="button-secondary"
              onClick={() => handleRemove(forms, selectedTab, uponRemoval)}
              type="button"
            >
              {`Remove ${label}` || 'Remove Section'}
            </button>
          )}
          <button
            className="button-secondary"
            disabled={forms && forms.length === maxTabs}
            onClick={() => handleAdd(fields, inputs, group, updateState)}
            styleName="tab-button"
            type="button"
          >
            {`Add ${label}` || 'Add Section'}
          </button>
        </div>
      </div>
    </div>
  );
};

TabbedForm.propTypes = {
  fields: propTypes.array,
  group: propTypes.string,
  inputs: propTypes.object,
  label: propTypes.string,
  maxTabs: propTypes.number,
  stateFunc: propTypes.func
};

TabbedForm.defaultProps = {
  maxTabs: 3
};

export default TabbedForm;
