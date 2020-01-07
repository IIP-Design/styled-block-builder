import React from 'react';
import { v4 as uuid } from 'uuid';

const deleteFromState = (state, id) => {
  if (state?.templates) {
    const clone = [...state.templates];

    const filtered = clone.filter(items => items.id !== id);

    return filtered;
  }

  return [];
};

const saveInState = (state, template) => {
  if (state?.templates) {
    const clone = [...state.templates];

    // ID comes over as a string so must be converted into a number
    const intID = Number(template.id);
    const filtered = clone.filter(items => items.id !== intID);

    const newItem = {
      id: intID,
      meta: template.post_meta,
      title: template.post_title,
      type: `gpalab-${template.post_type}`
    };

    filtered.push(newItem);

    return filtered;
  }

  return [];
};

const addFile = (file, name, fileList) => {
  const files = fileList || [];

  files.push({ file, name });

  return files;
};

const addGroupItem = (fields, formValues, group) => {
  const fieldNames = fields.map(field => field.name);

  const groupArr = formValues[group] ? [...formValues[group]] : [];
  // Create an object to store values for new resource
  const obj = {};
  obj.id = uuid();
  fieldNames.forEach(name => {
    obj[name] = '';
  });

  groupArr.push(obj);

  return groupArr;
};

const removeGroupItem = (formValues, group, id) => {
  const groupArr = formValues[group] ? [...formValues[group]] : [];

  const filtered = groupArr.filter(item => item.id !== id);

  return filtered;
};

export const handleNestedInput = (group, name, parent, value) => {
  // Make an updated replica of the form objects
  const newState = [...group];
  newState.map(item => {
    if (item.id === parent) {
      item[name] = value;
    }

    return item;
  });

  return newState;
};

const addToUpdating = (state, id) => {
  if (state?.updating) {
    const clone = [...state.updating];
    if (!clone.includes(id)) {
      clone.push(id);
    }

    return clone;
  }

  return [];
};

const removeFromUpdating = (state, id) => {
  if (state?.updating) {
    const clone = [...state.updating];

    const resetUpdating = clone.filter(item => item !== id);

    return resetUpdating;
  }

  return [];
};

export const MetaboxContext = React.createContext();

export const metaboxReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case 'init':
      return {
        ...state,
        templates: payload
      };
    case 'delete':
      return {
        ...state,
        templates: deleteFromState(state, payload)
      };
    case 'save':
      return {
        ...state,
        templates: saveInState(state, payload)
      };
    case 'file-add':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            files: addFile(payload.file, payload.name, state.formData.formValues.files)
          }
        }
      };
    case 'form-update':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.name]: payload.value
          }
        }
      };
    case 'group-add':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.group]: addGroupItem(payload.fields, state.formData.formValues, payload.group)
          }
        }
      };
    case 'group-input':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.group]: handleNestedInput(
              state.formData.formValues[payload.group],
              payload.name,
              payload.parent,
              payload.value
            )
          }
        }
      };
    case 'group-remove':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.group]: removeGroupItem(state.formData.formValues, payload.group, payload.id)
          }
        }
      };
    case 'modal-hide':
      return {
        ...state,
        formData: {
          formId: 0,
          formType: '',
          formValues: {}
        },
        showModal: false
      };
    case 'modal-show':
      return {
        ...state,
        formData: {
          formId: payload.formId,
          formType: payload.formType,
          formValues: payload.formValues
        },
        showModal: true
      };
    case 'updating-add':
      return {
        ...state,
        updating: addToUpdating(state, payload)
      };
    case 'updating-remove':
      return {
        ...state,
        updating: removeFromUpdating(state, payload)
      };
    default:
      throw new Error();
  }
};
