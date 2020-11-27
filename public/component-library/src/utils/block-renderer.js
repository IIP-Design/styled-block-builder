import React from 'react';
import ReactDOM from 'react-dom';

import ArticleFeed from '../ArticleFeed/ArticleFeed';
import Hero from '../Hero/Hero';
import LinkList from '../LinkList/LinkList';
import Navigation from '../Navigation/Navigation';
import Parallax from '../Parallax/Parallax';
import QuoteBox from '../QuoteBox/QuoteBox';
import Resources from '../Resources/Resources';
import Slides from '../Slides/Slides';
import Stats from '../Stats/Stats';
import Text from '../Text/Text';
import Timeline from '../Timeline/Timeline';

/**
 * Get the block by id from a list of blocks.
 *
 * @param {string} id         Block id value.
 * @param {Object[]} blocks   A list of block data objects.
 * @returns {Object}          Block data object or empty object if block not found.
 */
const getCurrentBlock = ( id, blocks ) => blocks.filter( b => b.id === id )[0] || {};

/**
 * Extract the meta data for a given block by id from a list of blocks.
 *
 * @param {string} id         Block id value.
 * @param {Object[]} blocks   A list of block data objects.
 * @returns {Object|null}     Block metadata object or null if block not found.
 */
const getBlockById = ( id, blocks ) => {
  const block = getCurrentBlock( id, blocks );

  const meta = block?.meta || null;

  if ( meta === null ) {
    console.error( `Block with id: ${id} not found` ); // eslint-disable-line no-console
  }

  return meta;
};

/**
 * Check whether a given block is identified as the primary block by id from a list of blocks.
 *
 * @param {string} id         Block id value.
 * @param {Object[]} blocks   A list of block data objects.
 * @returns {boolean}         Whether or not a block is the primary block.
 */
const isPrimary = ( id, blocks ) => {
  const block = getCurrentBlock( id, blocks );

  return block.primary;
};

/**
 * Finds all divs in document to which a block should be attached, and then renders the appropriate blocks.
 *
 * @param {Object[]} blocks  A list of block data objects.
 */
const renderBlocks = blocks => {
  const articleFeed = [...document.querySelectorAll( 'div[data-type="gpalab-article-feed"]' )];
  const hero = [...document.querySelectorAll( 'div[data-type="gpalab-hero"]' )];
  const linkList = [...document.querySelectorAll( 'div[data-type="gpalab-link-list"]' )];
  const navigation = [...document.querySelectorAll( 'div[data-type="gpalab-navigation"]' )];
  const parallax = [...document.querySelectorAll( 'div[data-type="gpalab-parallax"]' )];
  const quoteBox = [...document.querySelectorAll( 'div[data-type="gpalab-quote-box"]' )];
  const resources = [...document.querySelectorAll( 'div[data-type="gpalab-resources"]' )];
  const slides = [...document.querySelectorAll( 'div[data-type="gpalab-slides"]' )];
  const stats = [...document.querySelectorAll( 'div[data-type="gpalab-stats"]' )];
  const text = [...document.querySelectorAll( 'div[data-type="gpalab-text"]' )];
  const timeline = [...document.querySelectorAll( 'div[data-type="gpalab-timeline"]' )];

  if ( articleFeed ) {
    articleFeed.forEach( div => {
      ReactDOM.render(
        <ArticleFeed
          block={ getBlockById( div.dataset.id, blocks ) }
          id={ div.dataset.id }
          primary={ isPrimary( div.dataset.id, blocks ) }
        />,
        div,
      );
    } );
  }

  if ( hero ) {
    hero.forEach( div => {
      ReactDOM.render(
        <Hero
          block={ getBlockById( div.dataset.id, blocks ) }
          primary={ isPrimary( div.dataset.id, blocks ) }
        />,
        div,
      );
    } );
  }

  if ( linkList ) {
    linkList.forEach( div => {
      ReactDOM.render(
        <LinkList
          block={ getBlockById( div.dataset.id, blocks ) }
          primary={ isPrimary( div.dataset.id, blocks ) }
        />,
        div,
      );
    } );
  }

  if ( navigation ) {
    navigation.forEach( div => {
      ReactDOM.render(
        <Navigation
          block={ getBlockById( div.dataset.id, blocks ) }
          primary={ isPrimary( div.dataset.id, blocks ) }
        />,
        div,
      );
    } );
  }

  if ( parallax ) {
    parallax.forEach( div => {
      ReactDOM.render(
        <Parallax
          block={ getBlockById( div.dataset.id, blocks ) }
          primary={ isPrimary( div.dataset.id, blocks ) }
        />,
        div,
      );
    } );
  }

  if ( quoteBox ) {
    quoteBox.forEach( div => {
      ReactDOM.render(
        <QuoteBox
          block={ getBlockById( div.dataset.id, blocks ) }
          id={ div.dataset.id }
          primary={ isPrimary( div.dataset.id, blocks ) }
        />,
        div,
      );
    } );
  }

  if ( resources ) {
    resources.forEach( div => {
      ReactDOM.render(
        <Resources
          block={ getBlockById( div.dataset.id, blocks ) }
          primary={ isPrimary( div.dataset.id, blocks ) }
        />,
        div,
      );
    } );
  }

  if ( slides ) {
    slides.forEach( div => {
      ReactDOM.render(
        <Slides
          block={ getBlockById( div.dataset.id, blocks ) }
          id={ div.dataset.id }
          primary={ isPrimary( div.dataset.id, blocks ) }
        />,
        div,
      );
    } );
  }

  if ( stats ) {
    stats.forEach( div => {
      ReactDOM.render(
        <Stats
          block={ getBlockById( div.dataset.id, blocks ) }
          id={ div.dataset.id }
          primary={ isPrimary( div.dataset.id, blocks ) }
        />,
        div,
      );
    } );
  }

  if ( text ) {
    text.forEach( div => {
      ReactDOM.render(
        <Text
          block={ getBlockById( div.dataset.id, blocks ) }
          id={ div.dataset.id }
          primary={ isPrimary( div.dataset.id, blocks ) }
        />,
        div,
      );
    } );
  }

  if ( timeline ) {
    timeline.forEach( div => {
      ReactDOM.render(
        <Timeline
          block={ getBlockById( div.dataset.id, blocks ) }
          primary={ isPrimary( div.dataset.id, blocks ) }
        />,
        div,
      );
    } );
  }
};

export default renderBlocks;
