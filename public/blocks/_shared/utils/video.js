const brightcove = window?.gpalabBlockFront?.brightcove;

/**
 * Fetch id from url. A YouTube link can either use the
 * short form or long form so check both
 * @param {string} url YouTube share url
 * @return YouTube id
 */
const getYouTubeId = url => {
  const reShort = /https:\/\/youtu.be\/(.*)/;
  const reEmbed = /https:\/\/www.youtube.com\/embed\/(.*)/;
  const reLong = /https:\/\/www.youtube.com\/watch\?v=(.*)/;

  const idShort = url.match( reShort );
  const idEmbed = url.match( reEmbed );
  const idLong = url.match( reLong );

  if ( idShort ) {
    return idShort[1];
  } if ( idLong ) {
    return idLong[1];
  } if ( idEmbed ) {
    return idEmbed[1];
  }

  return null;
};

export const getVideoUrl = video => {
  switch ( video.source ) {
    case 'brightcove':
      return `https://players.brightcove.net/${brightcove}/default_default/index.html?videoId=${video.brightcove}`;
    case 'youtube':
      return `https://www.youtube.com/embed/${getYouTubeId( video.url )}`;
    default:
      return video.url;
  }
};
