import { attributes } from './attributes';

const { wp } = window;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'gcx-templates/animated-highlight', {
  title: __( 'Animated Highlight', 'gcx-templates' ),
  category: 'gcx_animated',
  icon: 'admin-appearance',
  attributes,
  edit( props ) {
    return <div>Test</div>;
  },
  save( props ) {
    return <div>Test</div>;
  }
} );
