import React from 'react';

import ArticleFeedForm from 'metabox/components/Forms/ArticleFeedForm';
import HeroForm from 'metabox/components/Forms/HeroForm';
import ParallaxForm from 'metabox/components/Forms/ParallaxForm';
import QuoteBoxForm from 'metabox/components/Forms/QuoteBoxForm';
import ResourcesForm from 'metabox/components/Forms/ResourcesForm';
import SlidesForm from 'metabox/components/Forms/SlidesForm';
import StatsForm from 'metabox/components/Forms/StatsForm';
import TextForm from 'metabox/components/Forms/TextForm';
import TimelineForm from 'metabox/components/Forms/TimelineForm';

export const selectForm = formStr => {
  switch (formStr) {
    case 'article-feed':
      return <ArticleFeedForm />;
    case 'hero':
      return <HeroForm />;
    case 'parallax':
      return <ParallaxForm />;
    case 'quote-box':
      return <QuoteBoxForm />;
    case 'resources':
      return <ResourcesForm />;
    case 'slides':
      return <SlidesForm />;
    case 'stats':
      return <StatsForm />;
    case 'text':
      return <TextForm />;
    case 'timeline':
      return <TimelineForm />;
    default:
      return null;
  }
};

export const selectTitle = formStr => {
  switch (formStr) {
    case 'article-feed':
      return 'Configure Your Article Feed:';
    case 'hero':
      return 'Configure Your Hero Block:';
    case 'parallax':
      return 'Configure Your Parallax Block:';
    case 'quote-box':
      return 'Configure Your Quote Box:';
    case 'resources':
      return 'Configure Your Resources Block:';
    case 'slides':
      return 'Configure Your Slides Block:';
    case 'stats':
      return 'Configure Your Stats Block:';
    case 'text':
      return 'Configure Your Text Block:';
    case 'timeline':
      return 'Configure Your Timeline Block:';
    default:
      return null;
  }
};

// export const selectForm = formStr => {
//   let selectedForm = null;
//   let formTitle = null;

//   switch (formStr) {
//     case 'article-feed':
//       formTitle = 'Configure Your Article Feed:';
//       selectedForm = <ArticleFeedForm />;
//       break;
//     case 'hero':
//       formTitle = 'Configure Your Hero Block:';
//       selectedForm = <HeroForm />;
//       break;
//     case 'parallax':
//       formTitle = 'Configure Your Parallax Block:';
//       selectedForm = <ParallaxForm />;
//       break;
//     case 'quote-box':
//       formTitle = 'Configure Your Quote Box:';
//       selectedForm = <QuoteBoxForm />;
//       break;
//     case 'resources':
//       formTitle = 'Configure Your Resources Block:';
//       selectedForm = <ResourcesForm />;
//       break;
//     case 'slides':
//       formTitle = 'Configure Your Slides Block:';
//       selectedForm = <SlidesForm />;
//       break;
//     case 'stats':
//       formTitle = 'Configure Your Stats Block:';
//       selectedForm = <StatsForm />;
//       break;
//     case 'text':
//       formTitle = 'Configure Your Text Block:';
//       selectedForm = <TextForm />;
//       break;
//     case 'timeline':
//       formTitle = 'Configure Your Timeline Block:';
//       selectedForm = <TimelineForm />;
//       break;
//     default:
//       return null;
//   }

//   return selectedForm;
// };

export default selectForm;
