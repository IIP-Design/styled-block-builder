/**
 * The following functions accept various form inputs and route them to the appropriate context dispatch
 * The are used repeatedly in many different form components. BE CAREFUL IF CHANGING as you make break other components.
 */

// Handles form input changes
export const handleChange = (e, dispatch) => {
  const { name, value } = e.target;

  dispatch({ type: 'form-update', payload: { name, value } });
};

// Manages a color change using the color picker component
export const handleColor = (e, dispatch) => {
  const { group } = e.target.dataset;
  const { value } = e.target;

  dispatch({ type: 'form-update', payload: { name: group, value } });
};

// Handles a checkbox toggle
export const handleToggle = (e, dispatch, values) => {
  const { name } = e.target;
  const isChecked = values[name] || false;

  dispatch({ type: 'form-update', payload: { name, value: !isChecked } });
};
