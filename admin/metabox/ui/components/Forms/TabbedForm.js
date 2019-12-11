import React, { Fragment, useState } from 'react';
import propTypes from 'prop-types';

import './TabbedForm.module.scss';
import { keyGen } from '../../utils/generate-key';

const addTab = ( fields, group, inputs, stateFunc ) => {
  // Create an object to store values for new resource
  const obj = {};
  fields.forEach( field => {
    obj[field] = '';
    return obj;
  } );

  // Replicate resources array and add new resource object
  const clone = [...inputs[group]];
  clone.push( obj );

  // Function passed from parent to update it's state
  stateFunc( group, clone );
};

const TabbedForm = ( { children, fields, group, inputs, label, stateFunc } ) => {
  const [selectedTab, setSelectedTab] = useState( null );
  const [tabs, setTabs] = useState( 0 );

  const handleAdd = () => {
    addTab( fields, group, inputs, stateFunc );

    const totalTabs = tabs + 1;
    setSelectedTab( totalTabs );
    setTabs( totalTabs );
  };

  const handleRemove = () => {
    const totalTabs = tabs - 1;
    setSelectedTab( totalTabs );
    setTabs( totalTabs );
  };

  return (
    <div>
      <button className="button-secondary" onClick={ () => handleAdd() } type="button">
        { label || 'Add Section' }
      </button>
      <div className="tabbed-form">
        { children && children.length > 0 && (
          <Fragment>
            <div styleName="tabs">
              { children.map( ( child, index ) => (
                <button
                  id={ `tab-${index}` }
                  key={ keyGen( index ) }
                  onClick={ () => setSelectedTab( index + 1 ) }
                  styleName={ selectedTab === index + 1 ? 'tab selected-tab' : 'tab' }
                  type="button"
                >
                  { `Tab ${index}` }
                </button>
              ) ) }
            </div>
            <div className="tab-container">
              { children.map( ( child, index ) => (
                <div
                  id={ `tab-item-${index}` }
                  key={ keyGen( index ) }
                  styleName={ selectedTab === index + 1 ? 'tab-item selected-item' : 'tab-item' }
                >
                  { child }
                </div>
              ) ) }
            </div>
            <button className="button-secondary" onClick={ () => handleRemove() } type="button">
              Remove This Item
            </button>
          </Fragment>
        ) }
      </div>
    </div>
  );
};

TabbedForm.propTypes = {
  children: propTypes.node,
  fields: propTypes.array,
  group: propTypes.string,
  inputs: propTypes.object,
  label: propTypes.string,
  stateFunc: propTypes.func
};

export default TabbedForm;
