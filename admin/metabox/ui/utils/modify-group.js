import { v4 as uuid } from 'uuid';

export const handleAdd = ( fields, inputs, group, updateState ) => {
  const fieldNames = fields.map( field => field.name );

  // Create an object to store values for new resource
  const obj = {};
  obj.id = uuid();
  fieldNames.forEach( name => {
    obj[name] = name === 'hasFeed' ? false : '';
    return obj;
  } );

  if ( inputs.id ) {
    obj.parent = inputs.id;
  }

  // Replicate resources array and populate it with previously created object
  const clone = [...inputs[group]];
  clone.push( obj );

  // Handle all the state updates
  updateState( clone, obj.id );
};

export const handleInput = ( e, data, updateState ) => {
  const { parent } = e.target.dataset;
  const { name, value } = e.target;

  // Make an updated replica of the form objects
  const newState = [...data];
  newState.map( item => {
    if ( item.id === parent ) {
      item[name] = value;
    }

    return item;
  } );

  updateState( newState );
};

export const handleRemove = ( data, parent, updateState ) => {
  const selected = data.filter( item => item.id === parent );
  const index = data.indexOf( selected[0] );

  // Replicate resources array and add new resource object
  const clone = [...data];
  clone.splice( index, 1 );

  updateState( clone, index );
};
