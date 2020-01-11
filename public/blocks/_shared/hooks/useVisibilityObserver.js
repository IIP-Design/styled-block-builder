import { useEffect, useRef, useState } from 'react';

const useVisibilityObserver = ({ root = null, rootMargin = '0px', threshold = 0.5 }) => {
  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new window.IntersectionObserver(([e]) => setEntry(e), {
      root,
      rootMargin,
      threshold
    });

    const { current: currentObserver } = observer;

    if (node) {
      currentObserver.observe(node);
    }

    return () => currentObserver.disconnect();
  }, [node]);

  return [setNode, entry];
};

export default useVisibilityObserver;
