import React, { Fragment, useContext, useState } from 'react';
import propTypes from 'prop-types';

import ArticleById from 'metabox/components/Forms/FeedTypes/ArticleById';
import CheckboxConditional from 'metabox/components/Forms/Toggles/CheckboxConditional';
import FileUploader from 'metabox/components/FileUploader/FileUploader';
import { getTabTitleField, responsiveTitle } from 'metabox/utils/tab-titles';
import { handleFile } from 'metabox/utils/modify-group';
import { MetaboxContext } from 'metabox/components/Metabox/MetaboxContext';

import './TabbedForm.module.scss';

const TabbedForm = ({ fields, group, label, maxTabs, stateFunc }) => {
  const [selectedTab, setSelectedTab] = useState(null);

  const { dispatch, state } = useContext(MetaboxContext);
  const formValues = state?.formData?.formValues ? state.formData.formValues : {};

  const updateState = (val, index) => {
    stateFunc(group, val);

    if (index) {
      setSelectedTab(index);
    }
  };

  const handleChange = (e, itemId) => {
    const { name, value } = e.target;

    dispatch({ type: 'group-input', payload: { group, itemId, name, value } });
  };

  const handleRemoval = forms => {
    const selected = forms.filter(item => item.id === selectedTab);
    const index = forms.indexOf(selected[0]);

    // Replicate resources array and add new resource object
    const clone = [...forms];
    clone.splice(index, 1);

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

    if (tab) {
      setSelectedTab(tab);
    }

    dispatch({ type: 'group-remove', payload: { group, id: selectedTab } });
  };

  const handleToggle = (name, itemId) => {
    const isChecked = formValues[name] || false;

    dispatch({ type: 'group-input', payload: { group, itemId, name, value: !isChecked } });
  };

  if (formValues) {
    const forms = formValues[group] || [];

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
                      key={`tab-${form.id}`}
                      id={`tab-${index}`}
                      styleName={selectedTab === form.id ? 'tab selected-tab' : 'tab'}
                      type="button"
                      onClick={() => setSelectedTab(form.id)}
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
                      key={`tab-item-${form.id}`}
                      id={`tab-item-${form.id}`}
                      styleName={selectedTab === form.id ? 'tab-item selected-item' : 'tab-item'}
                    >
                      {fields &&
                        fields.map(field => {
                          if (field.type === 'file') {
                            return (
                              <FileUploader
                                key={`${field.name}-${form.id}`}
                                callback={e => handleFile(e, form.id, forms, updateState)}
                                label={field.label || ''}
                                name={field.name}
                              />
                            );
                          }

                          if (field.type === 'text') {
                            return (
                              <label
                                key={`${field.name}-${form.id}`}
                                htmlFor={`section-${field.name}-${form.id}`}
                              >
                                {field.label || ''}
                                <input
                                  data-parent={form.id}
                                  id={`section-${field.name}-${form.id}`}
                                  name={field.name}
                                  type="text"
                                  value={selected[0][field.name]}
                                  onChange={e => handleChange(e, form.id)}
                                />
                              </label>
                            );
                          }

                          if (field.type === 'textarea') {
                            return (
                              <label
                                key={`${field.name}-${form.id}`}
                                htmlFor={`section-${field.name}-${form.id}`}
                              >
                                {field.label || ''}
                                <textarea
                                  data-parent={form.id}
                                  id={`section-${field.name}-${form.id}`}
                                  name={field.name}
                                  rows="6"
                                  value={selected[0][field.name]}
                                  onChange={e => handleChange(e, form.id)}
                                />
                              </label>
                            );
                          }

                          if (field.type === 'article-feed') {
                            return (
                              <CheckboxConditional
                                key={`${field.name}-${form.id}`}
                                callback={() => handleToggle('hasFeed', form.id)}
                                checked={form.hasFeed || false}
                                data-parent={form.id}
                                label={field.label || ''}
                                name={form.id}
                              >
                                <ArticleById parentGroup={group} parentId={form.id} />
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
                type="button"
                onClick={() => handleRemoval(forms)}
              >
                {`Remove ${label}` || 'Remove Section'}
              </button>
            )}
            <button
              className="button-secondary"
              disabled={forms && forms.length === maxTabs}
              styleName="tab-button"
              type="button"
              onClick={() => dispatch({ type: 'group-add', payload: { fields, group } })}
            >
              {`Add ${label}` || 'Add Section'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

TabbedForm.propTypes = {
  fields: propTypes.array,
  group: propTypes.string,
  label: propTypes.string,
  maxTabs: propTypes.number,
  stateFunc: propTypes.func
};

TabbedForm.defaultProps = {
  maxTabs: 3
};

export default TabbedForm;
