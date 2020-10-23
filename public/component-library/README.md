# GPA/LAB Styled Blocks Component Library

## Installation

This library can be installed using NPM by running:

`npm i @gpa-lab/styled-blocks`

You must also import the block CSS file into your application.

`import '/node_modules/@gpa-lab/styled-blocks/lib/lab-blocks.css'`

## Usage

Once installed there are two ways to add blocks to your application:

### Traditional React Component

The preferred way to use this library is to import desired components and pass in the block meta data as a prop.

```jsx
import { Hero } from '@gpa-labs/styled-blocks';

const MyPage = () => {

  const block = {
    id: 'block1',
    meta: {...}
  }

  return (
    ...
    <Hero blocks={ block.meta } />
    ...
  )
}
```

### Block Renderer Function

In some cases you may have the block root divs on your page before you have the block data in hand (for example if the page content is coming in via a headless CMS). In this case you can use the included `renderBlocks` function, which will query the document for all root divs and then match those roots with the corresponding block data and render out matching blocks.

```jsx
import { renderBlocks } from '@gpa-labs/styled-blocks';

const MyPage = () => {
  const blocks = [
    {
      id: 'block1',
      meta: {...}
    },
    {
      id: 'block3',
      meta: {...}
    }
  ]

  useEffect( () => {
    renderBlocks( blocks, "https://my-website.com/assets/" );
  }, [blocks] );

  return (
    ...
    <div data-id="block1" data-type="gpalab-hero" id="block1" /> // This block will render
    <div data-id="block2" data-type="gpalab-parallax" id="block2" /> // This block will not render
    <div data-id="block3" data-type="gpalab-resources" id="block3" /> //T his block will render
    ...
  )
}
```

## Available Components:

- Article Feed
- Hero Block
- Link List
- Navigation Block
- Parallax Block
- Quote Box
- Resources Section
- Slide Block
- Text Block
- Timeline Block
