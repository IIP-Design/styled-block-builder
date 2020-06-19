import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ErrorMessage from './ErrorMessage';

const mockProps = {
  closeFunc: jest.fn(),
  err: {
    message: 'Forbidden',
    status: 403,
  },
};

const headingOne = 'Unable to save changes';
const headingTwo = 'We encountered the following error...';
const fallback = 'Sorry. No error message available';

describe( '<ErrorMessage />', () => {
  it( 'renders with the provided error message and status', () => {
    const { getAllByText } = render( <ErrorMessage { ...mockProps } /> );

    expect( getAllByText( headingOne ) ).toHaveLength( 1 );
    expect( getAllByText( headingTwo ) ).toHaveLength( 1 );
    expect( getAllByText( mockProps.err.message ) ).toHaveLength( 1 );
    expect( getAllByText( mockProps.err.status.toString() ) ).toHaveLength( 1 );
  } );

  it( 'renders the fallback messages when no error is provided', () => {
    const { getAllByText } = render( <ErrorMessage props={ { ...mockProps, err: null } } /> );

    expect( getAllByText( headingOne ) ).toHaveLength( 1 );
    expect( getAllByText( headingTwo ) ).toHaveLength( 1 );
    expect( getAllByText( fallback ) ).toHaveLength( 1 );
  } );

  it( 'fires the provided close function when the close button is clicked', () => {
    const { getByRole } = render( <ErrorMessage { ...mockProps } /> );

    fireEvent.click( getByRole( 'button' ) );

    expect( mockProps.closeFunc ).toHaveBeenCalledTimes( 1 );
  } );
} );
