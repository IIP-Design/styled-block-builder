import gsap from 'gsap';

const updateCount = el => {
  const counter = { val: 0 };
  const targetVal = el.getAttribute( 'data-stat' );

  const cb = () => { el.innerHTML = Math.ceil( counter.val ); };

  return { cb, counter, targetVal };
};

const updateOpacity = el => {
  const counter = { val: 0.25 };
  const targetVal = 1;

  const cb = () => { el.style.opacity = counter.val.toFixed( 2 ); };

  return { cb, counter, targetVal };
};

const getAnimationProps = ( elId, type ) => {
  const el = document.getElementById( elId );

  switch ( type ) {
    case 'number':
      return updateCount( el );
    case 'opacity':
      return updateOpacity( el );
    default:
      return updateOpacity( el );
  }
};

export const runStat = ( elId, animationType ) => {
  const opts = getAnimationProps( elId, animationType );

  gsap.to( opts.counter, {
    duration: 5,
    onUpdate: opts.cb,
    val: opts.targetVal,
  } );
};
