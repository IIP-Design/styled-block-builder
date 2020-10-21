import React from 'react';
import ReactDOM from 'react-dom';

import ArticleFeed from 'library/ArticleFeed/ArticleFeed';
import Hero from 'library/Hero/Hero';
import LinkList from 'library/LinkList/LinkList';
import Navigation from 'library/Navigation/Navigation';
import Parallax from 'library/Parallax/Parallax';
import QuoteBox from 'library/QuoteBox/QuoteBox';
import Resources from 'library/Resources/Resources';
import Slides from 'library/Slides/Slides';
import Stats from 'library/Stats/Stats';
import Text from 'library/Text/Text';
import Timeline from 'library/Timeline/Timeline';

const getBlockById = ( id, blocks ) => {
  const block = blocks.filter( b => b.id === id )[0] || {};

  const meta = block?.meta || null;

  if ( meta === null ) {
    console.error( `Block with id: ${id} not found` ); // eslint-disable-line no-console
  }

  return meta;
};

const renderBlocks = ( blocks, assetsUrl ) => {
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
        <ArticleFeed assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id, blocks ) } id={ div.dataset.id } />,
        div,
      );
    } );
  }

  if ( hero ) {
    hero.forEach( div => {
      ReactDOM.render(
        <Hero assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id, blocks ) } />,
        div,
      );
    } );
  }

  if ( linkList ) {
    linkList.forEach( div => {
      ReactDOM.render(
        <LinkList assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id, blocks ) } />,
        div,
      );
    } );
  }

  if ( navigation ) {
    navigation.forEach( div => {
      ReactDOM.render(
        <Navigation block={ getBlockById( div.dataset.id, blocks ) } />,
        div,
      );
    } );
  }

  if ( parallax ) {
    parallax.forEach( div => {
      ReactDOM.render(
        <Parallax assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id, blocks ) } />,
        div,
      );
    } );
  }

  if ( quoteBox ) {
    quoteBox.forEach( div => {
      ReactDOM.render(
        <QuoteBox assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id, blocks ) } id={ div.dataset.id } />,
        div,
      );
    } );
  }

  if ( resources ) {
    resources.forEach( div => {
      ReactDOM.render(
        <Resources assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id, blocks ) } />,
        div,
      );
    } );
  }

  if ( slides ) {
    slides.forEach( div => {
      ReactDOM.render(
        <Slides block={ getBlockById( div.dataset.id, blocks ) } id={ div.dataset.id } />,
        div,
      );
    } );
  }

  if ( stats ) {
    stats.forEach( div => {
      ReactDOM.render(
        <Stats assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id, blocks ) } id={ div.dataset.id } />,
        div,
      );
    } );
  }

  if ( text ) {
    text.forEach( div => {
      ReactDOM.render(
        <Text assetsUrl={ assetsUrl } block={ getBlockById( div.dataset.id, blocks ) } id={ div.dataset.id } />,
        div,
      );
    } );
  }

  if ( timeline ) {
    timeline.forEach( div => {
      ReactDOM.render(
        <Timeline block={ getBlockById( div.dataset.id, blocks ) } />,
        div,
      );
    } );
  }
};

export default renderBlocks;
