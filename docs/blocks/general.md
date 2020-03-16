---
title: Styled Blocks Overview
---

### Creating a New Block

Navigate to the Styled Blocks section within the editor to configure a new block. (Please note that only users with administrative priviledges will be able to add blocks)

1. Select the desired block from the **Add Block:** dropdown.

   - The current list of blocks can be found below. Refer to each specific block for detailed user guides.
     - **[Article Feed](/styled-block-builder/blocks/article-feed)**: Displays up to three articles from available sources.
     - **[Hero](/styled-block-builder/blocks/hero)**: Use for highlighting the title and purpose of the page.
     - **[Parallax](/styled-block-builder/blocks/parallax)**: Fixed background with text.
     - **[Quote](/styled-block-builder/blocks/quote)**: Use for highlighting a specific quote.
     - **[Resources](/styled-block-builder/blocks/resources)**: Use for adding materials or splitting up subsections into different resource tabs.
     - **[Slides](/styled-block-builder/blocks/slides)**: Add up to 10 slides that display an image with text information.
     - **[Stats](/styled-block-builder/blocks/stats)**: Highlight up to three stats with a count up animation.
     - **[Text](/styled-block-builder/blocks/text)**: Use as the primary text information block. Contains multiple media options.
     - **[Timeline](/styled-block-builder/blocks/timeline)**: Add up to 5 events to an interactive timeline with large images.

2. Select **Configure Block** to bring up the block editor window.
3. Refer to the individual user guides linked above for notes on setting up each block.

### Editing an Existing Block

1. Click on the **Pencil** icon within the list of Existing Blocks for This Post.
2. Make any necessary edits to the block and then hit save.

### Adding a Block to the Page

1. Within the **Configure Your Text Block** window, access the created shortcode at the bottom.
2. Copy the shortcode and close out the configuration window.
3. Paste into the **Visual** tab of the text editor where you want the block to appear on the page.
4. Update or save the page as a draft.

### Removing a Block from the Page

1. Delete the shortcode from the **Visual** tab of the text editor.
2. Update the page.

### Choosing Images for Blocks

We recommend selecting images specificaly for use within each block. Most blocks work well with images that act as a background. Preview the block on the page to make sure the image works well with the block and make adjustments to the image or selection accordingly.

### Ordering Blocks on a Page

Place the shortcodes within the visual content editor in the order that you want them to appear on the page. Blocks can be placed in any order on the page.

Additionally, blocks can be separated by other content within the visual editor. For example, you could place a Hero block that is followed by text and then insert a Stats block:

```plaintext
[gpalab_block title='Testing Title' id='000000' type='hero']

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in varius sem.

Nullam at quam nisl. Mauris lacinia nisi tortor, id tempor arcu commodo sed.

[gpalab_block title='Testing Stats' id='000000' type='stats']

```

#### Block Order Best Practices

We recommend placing the blocks in the order that makes the most sense for your content and messaging. We also recommend using each block for it's intended purpose. If there is currently not a block that meets your need, we suggest placing that content between the blocks as shown above.

While blocks can be placed in any order, we recommend that you preview the page and look to make sure the selected backgrounds of some blocks work stacked on top of each other:

- Stats and Slides: Content scrolls across a fixed background that covers the entire screen. When placed next to each other, these blocks have more of an abrupt transition and would have a better impact if separated by another block.

- Consecutive Blocks with Images: Test your block order to make sure that the backgrounds selected work well when viewed consecutively on the page.
