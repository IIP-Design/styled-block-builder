---
title: Data Management
---

### Data Flow

This plugin uses React to render out user interfaces both on the admin side and on the site frontend. While very powerful, this paradigm presents some complexity in how data is passed between different parts of the application. Generally speaking, plugin data stored in the database is directly available to the server via calls to the database (such as `get_post_meta`). The React portion of the application does not have access to these methods and so must maintain it's own data. The state of the React portion can be initialed from the server on first load, but then must keep track of all data changes independent of updates to the server. As explained in much greater detail below, this means that server and client data for the application must be updated independently (either in a parallel or in an asynchronous manner) in order to stay in sync. This results in a generally circular data flow, whereby the React application is initialized with data from the server and the server is notified to changes in the React application's data by means of AJAX requests.

#### Admin Data Flow

As illustrated below, admin data flows in a circular fashion from the server to the admin interface in the browser and back to the server.

![Diagram of how the data flows through the plugin admin](https://iip-design.github.io/styled-block-builder/assets/img/admin-data-flow.png)

The data for a particular block data is stored within a serialized array of blocks. This serialized array contains the data for every block associated with a given post and is saved under the metakey `gpalab_blocks` in the postmeta for the given post (generally found in the `wp_postmeta` table in the database).

When the admin JavaScript bundle is enqueued (in `admin/class-admin.php`), it is also localized with the block data for the current post the user is on. Specifically, this means that the serialized array of block data is retrieved from postmeta and appended to the browser's `window` object. This makes the data from the server available to the admin React application as the property `gpalabBlockAdmin.blocks` on the window. [Note that localization reflects the server data at a point in time, and the JS bundle is only re-localized upon page refresh. This is why we must store a mirror of the data in the React application's state.]

The admin React application maintains all of it's state in a single React context object. The admin context object first loads with empty/default values for all the applications state (in the case of block data this is an empty array). This state is updated by dispatching actions to the `adminReducer`, which creates a copy of the application state altering it as appropriate given the dispatched action.

When it is first rendered, the `Metabox` component pulls the block data from the server off of the window object. It then dispatches a `init` action to the `adminReducer`, which populates the context object with the block data from the server. Now the React application state is in sync with the data saved in the data base.

The other React components in the application rely on this state object in the admin context to render the proper data in the admin interface. In the cases where components need to change the state of the application (for example when a user adds data to a block form), they dispatch their own action to the `adminReducer` to update the context. At certain key junctures (such as when a user clicks the **Save** button on the form modal) the entirety of the updated block data is conveyed to the server by firing the updatePost()` function.

This function normalizes the block data stored in the admin context into multipart form data to which it appends the appropriate action name and a security nonce. This form data is then sent to the site's `admin-ajax.php` via a POST fetch request. Upon receipt, `admin-ajax.php` uses the provided action name to route the post data to the appropriate handler function in the `Styled_Block/Update_Block` class.

These functions verify the provided nonce, validate and sanitize all provided form data, and (if all checks pass) update the block data in the given post's metadata. Upon the completion of these operations the server is again in sync with the admin React application and will send a success response to the browser.

#### Frontend Data Flow

![Diagram of how the data flows through the plugin frontend](https://iip-design.github.io/styled-block-builder/assets/img/frontend-data-flow.png)

While the data flow on the plugin frontend follow a similar model to the admin flow described above, state management is much simpler. This is because the frontend is not dynamic (i.e. not impacted by any user interactions) meaning that there is only a one-way flow of data from the server to the browser.

As in the admin data flow, the source of block data is a serialized array stored in post metadata. The frontend JavaScript file (`dist/gpalab-block-frontend.js`) is localized with this array of block data in `admin/shortcode/class-shortcode.php`. This localization appends the property `gpalabBlocks.blocks` to the browser's `window` object when the frontend script is loaded.

When the page is loaded, the blocks data object is pulled off of the `window` and passed to the `renderBlocks()` function. This function then finds all of the root divs on the page that have a `data-type` attribute matching one of the GPA Lab block types. Each of these root divs also has a `data-id` attribute that matches the id of the block that should be attached to that div. The block id and type are extracted from the root div and used to get the matching data from the blocks data object provided to the function. This in turn allows for the application to to render the correct block components onto the DOM.

### Cleanup

The plugin includes an uninstall hook that removes all the plugin-related data when the plugin is deleted from the site. Specifically, the uninstall hook will:

1. Delete all of the plugin settings saved as option values in the `wp_options` table:
   - `gpalab-blocks-brightcove` - A Brightcove account id to used for embedding Brightcove videos in blocks.
   - `gpalab-blocks-dev-mode` - Whether or not to use the development build of the plugin JavaScript bundles.
   - `gpalab-blocks-feed-sources` - Which source sites the article feed component can pull content from.
   - `gpalab-blocks-role` - The WordPress role required to add styled blocks to posts.
   - `gpalab-blocks-styling` - Whether or not to use the state.gov style overrides.
1. Remove the custom capability added to manage access to the plugin:
   - `gpalab_blocks_add` - This custom capability allows users to add styled blocks to a post.
1. Find all posts with associated block metadata (i.e. the metakeys `gpalab_blocks` or `gpalab_associated_blocks`) and delete that metadata.
