import React from 'react';

import {
  fileAdd,
  fileAddNested,
  fileRemove,
  fileRemoveNested,
  groupAddItem,
  groupAddItemNested,
  groupHandleInput,
  groupHandleInputNested,
  groupRemoveItem,
  groupRemoveItemNested,
  blockDelete,
  blockSave,
  updatingAddTo,
  updatingRemoveFrom,
} from 'metabox/utils/dispatch-helpers';

export const AdminContext = React.createContext();

export const adminReducer = ( state, action ) => {
  const { payload } = action;

  switch ( action.type ) {
    case 'init':
      return {
        ...state,
        blocks: payload,
      };
    case 'delete':
      return {
        ...state,
        blocks: blockDelete( state, payload ),
      };
    case 'save':
      return {
        ...state,
        formData: {
          ...state.formData,
          formId: payload.id,
          formValues: payload.meta,
        },
        blocks: blockSave( state, payload ),
      };
    case 'file-add':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            files: fileAdd(
              payload.alt,
              payload.file,
              payload.name,
              state.formData.formValues.files,
            ),
          },
        },
      };
    case 'file-add-nested':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.parentGroup]: fileAddNested(
              state.formData.formValues[payload.parentGroup],
              payload.alt,
              payload.file,
              payload.name,
              payload.parentId,
            ),
          },
        },
      };
    case 'file-remove':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            files: fileRemove( state.formData.formValues.files, payload.name ),
          },
        },
      };
    case 'file-remove-nested':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.parentGroup]: fileRemoveNested(
              state.formData.formValues[payload.parentGroup],
              payload.name,
              payload.parentId,
            ),
          },
        },
      };
    case 'form-update':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.name]: payload.value,
          },
        },
      };
    case 'group-add':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.group]: groupAddItem( payload.fields, state.formData.formValues, payload.group ),
          },
        },
      };
    case 'group-add-nested':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.parentGroup]: groupAddItemNested(
              state.formData.formValues[payload.parentGroup],
              payload.fields,
              payload.group,
              payload.parentId,
            ),
          },
        },
      };
    case 'group-input':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.group]: groupHandleInput(
              state.formData.formValues[payload.group],
              payload.itemId,
              payload.name,
              payload.value,
            ),
          },
        },
      };
    case 'group-input-nested':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.parentGroup]: groupHandleInputNested(
              state.formData.formValues[payload.parentGroup],
              payload.itemId,
              payload.group,
              payload.name,
              payload.parentId,
              payload.value,
            ),
          },
        },
      };
    case 'group-remove':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.group]: groupRemoveItem( state.formData.formValues, payload.group, payload.id ),
          },
        },
      };
    case 'group-remove-nested':
      return {
        ...state,
        formData: {
          ...state.formData,
          formValues: {
            ...state.formData.formValues,
            [payload.parentGroup]: groupRemoveItemNested(
              state.formData.formValues[payload.parentGroup],
              payload.itemId,
              payload.group,
              payload.parentId,
            ),
          },
        },
      };
    case 'legacy-convert':
      return {
        ...state,
        blocks: [...state.blocks, ...payload],
      };
    case 'migrated':
      return {
        ...state,
        migrated: true,
      };
    case 'modal-hide':
      return {
        ...state,
        formData: {
          formId: 0,
          formType: '',
          formValues: {},
        },
        showModal: false,
      };
    case 'modal-show':
      return {
        ...state,
        formData: {
          formId: payload.formId,
          formType: payload.formType,
          formValues: payload.formValues,
        },
        showModal: true,
      };
    case 'updating-add':
      return {
        ...state,
        updating: updatingAddTo( state, payload ),
      };
    case 'updating-remove':
      return {
        ...state,
        updating: updatingRemoveFrom( state, payload ),
      };
    default:
      throw new Error();
  }
};
