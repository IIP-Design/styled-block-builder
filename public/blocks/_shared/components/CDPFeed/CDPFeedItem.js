import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { getFromCDP, parseFeedItemData } from '../../utils/cdp';

const CDPFeedItem = ( { id, source } ) => {
  const [data, setData] = useState( null );

  useEffect( () => {
    const initalize = async () => {
      const response = await getFromCDP( id, source ).then( result => parseFeedItemData( result ) );

      setData( response );
    };

    initalize();
  }, [id] );

  if ( data ) {
    return (
      <div className="cdp-feed-item" key={ id } style={ { backgroundImage: `url('${data.image}')` } }>
        <a className="cdp-feed-item-link" href={ data.link }>
          <div>
            <p className="cdp-feed-item-title">{ data.title }</p>
          </div>
        </a>
      </div>
    );
  }

  return null;
};

CDPFeedItem.propTypes = {
  id: propTypes.string,
  source: propTypes.string
};

export default CDPFeedItem;
