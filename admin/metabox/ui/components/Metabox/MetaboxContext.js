import React from 'react';

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

export const MetaboxContext = React.createContext();

export const metaboxReducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return { templates: action.payload };
    case 'delete':
      return {
        ...state,
        templates: deleteFromState(state, action.payload)
      };
    case 'save':
      return {
        ...state,
        templates: saveInState(state, action.payload)
      };
    default:
      throw new Error();
  }
};
