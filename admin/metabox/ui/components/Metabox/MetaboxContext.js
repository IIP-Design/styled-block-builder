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
  // Get list of field names required.
  const fieldNames = fields.map(field => field.name);

  // Check if selected group member has relevant sub-group, if not create.
  const groupArr = formValues[group] ? [...formValues[group]] : [];

  // Create an object to store values for new resource.
  const obj = {};
  obj.id = uuid();
  fieldNames.forEach(name => {
    obj[name] = '';
  });

  // Add new object to sub-group.
  groupArr.push(obj);

  return groupArr;
};

const addNestedGroupItem = (parentGroup, fields, group, parentId) => {
  // Isolated the group member getting updated.
  const selected = parentGroup.filter(item => item.id === parentId)[0];

  // Store the remainder of the group.
  const temp = parentGroup.filter(item => item.id !== parentId);

  // Update the nested group.
  const groupArr = addGroupItem(fields, selected, group);

  // Update selected group member.
  selected[group] = groupArr;

  // Push updated item back into group
  temp.push(selected);

  return temp;
};

const removeGroupItem = (formValues, group, id) => {
  const groupArr = formValues[group] ? [...formValues[group]] : [];

  const filtered = groupArr.filter(item => item.id !== id);

  return filtered;
};

const removeNestedGroupInput = (data, itemId, group, parentId) => {
  let indexValue = 0;

  // Isolate the group-member getting updated.
  const selectedGroup = data.filter((item, index) => {
    if (item.id === parentId) {
      indexValue = index;
    }

    return item.id === parentId;
  })[0];

  // Store the remainder of the group.
  const groupTemp = data.filter(item => item.id !== parentId);

  // Check if selected group member has relevant sub-group, if not create.
  const groupArr = removeGroupItem(selectedGroup, group, itemId);

  selectedGroup[group] = groupArr;

  // Updated full group with altered sub-group.
  groupTemp.splice(indexValue, 0, selectedGroup);

  return groupTemp;
};

const handleNestedInput = (data, itemId, name, value) => {
  let itemIndexValue = 0;

  // Pull off selected sub-group item.
  const selectedItem = data.filter((item, index) => {
    if (item.id === itemId) {
      itemIndexValue = index;
    }

    return item.id === itemId;
  })[0];

  const itemsTemp = data.filter(item => item.id !== itemId);

  // Update selected sub-group item.
  selectedItem[name] = value;

  // Add updated sub-group item back to sub-group.
  itemsTemp.splice(itemIndexValue, 0, selectedItem);

  return itemsTemp;
};

const handleDoubleNestedInput = (data, itemId, group, name, parentId, value) => {
  let groupIndexValue = 0;

  // Isolate the group-member getting updated.
  const selectedGroup = data.filter((item, index) => {
    if (item.id === parentId) {
      groupIndexValue = index;
    }

    return item.id === parentId;
  })[0];

  // Store the remainder of the group.
  const groupTemp = data.filter(item => item.id !== parentId);

  // Check if selected group member has relevant sub-group, if not create.
  const groupArr = selectedGroup[group] ? [...selectedGroup[group]] : [];

  const itemsTemp = handleNestedInput(groupArr, itemId, name, value);

  // Updated full group with altered sub-group.
  selectedGroup[group] = itemsTemp;

  // groupTemp.push(selectedGroup);
  groupTemp.splice(groupIndexValue, 0, selectedGroup);

  return groupTemp;
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
    case 'group-add-nested':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.parentGroup]: addNestedGroupItem(
              state.formData.formValues[payload.parentGroup],
              payload.fields,
              payload.group,
              payload.parentId
            )
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
              payload.itemId,
              payload.name,
              payload.value
            )
          }
        }
      };
    case 'group-input-nested':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.parentGroup]: handleDoubleNestedInput(
              state.formData.formValues[payload.parentGroup],
              payload.itemId,
              payload.group,
              payload.name,
              payload.parentId,
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
    case 'group-remove-nested':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.parentGroup]: removeNestedGroupInput(
              state.formData.formValues[payload.parentGroup],
              payload.itemId,
              payload.group,
              payload.parentId
            )
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
