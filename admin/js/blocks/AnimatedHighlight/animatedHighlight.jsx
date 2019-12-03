/* eslint-disable react/prop-types */
import { atts } from './attributes';

const { wp } = window;
const { __ } = wp.i18n;
const { Dashicon } = wp.components;
const { registerBlockType } = wp.blocks;
const { MediaUpload, RichText } = wp.editor;

const edit = ( { attributes, setAttributes } ) => {
  const updateValue = value => {
    setAttributes( {
      text: value
    } );
  };

  const updateImg = value => {
    setAttributes( {
      img: value.sizes.full.url
    } );
  };

  return (
    <div className="gcx-ahl-container">
      <figure className="gcx-ahl-figure">
        <MediaUpload
          onSelect={ updateImg }
          render={ ( { open } ) => (
            <div className="gcx-ahl-media" onClick={ open } onKeyup={ open } role="button" tabIndex={ 0 }>
              { attributes.img && <img alt="" src={ attributes.img } /> }
              { !attributes.img && <Dashicon className="gcx-ahl-icon" icon="format-image" /> }
            </div>
          ) }
        />
      </figure>
      <RichText
        name="text"
        onChange={ updateValue }
        placeholder={ __( 'Enter text here', 'gcx-templates' ) }
        tagName="p"
        value={ attributes.text }
      />
    </div>
  );
};

const save = ( { attributes } ) => {
  return (
    <div className="gcx-ahl-container">
      <figure className="gcx-ahl-figure">
        <div className="gcx-ahl-media">
          { attributes.img && <img alt="" src={ attributes.img } /> }
          { !attributes.img && <Dashicon className="gcx-ahl-icon" icon="format-image" /> }
        </div>
      </figure>
      <RichText.Content tagName="p" value={ attributes.text } />
    </div>
  );
};

registerBlockType( 'gcx-templates/animated-highlight', {
  title: __( 'Animated Highlight', 'gcx-templates' ),
  category: 'gcx_animated',
  icon: 'admin-appearance',
  attributes: atts,
  edit,
  save
} );
