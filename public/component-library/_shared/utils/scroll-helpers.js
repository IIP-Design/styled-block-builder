export const getScrollOffsets = () => {
  const doc = document;
  const w = window;

  let el;
  let x;
  let y;

  if ( typeof w.pageYOffset === 'number' ) {
    x = w.pageXOffset;
    y = w.pageYOffset;
  } else {
    el = doc.compatMode && doc.compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;
    x = el.scrollLeft;
    y = el.scrollTop;
  }

  return { x, y };
};
