import { useLayoutEffect, useRef, useState, useCallback } from 'react';

/**
 * We use a negative right on the content to hide original OS scrollbars
 */
const OS_SCROLLBAR_WIDTH = (() => {
  const outer = document.createElement('div');
  const inner = document.createElement('div');
  outer.style.overflow = 'scroll';
  outer.style.width = '100%';
  inner.style.width = '100%';

  document.body.appendChild(outer);
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.removeChild(inner);
  document.body.removeChild(outer);

  return scrollbarWidth;
})();

/**
 * We need this for OSs that automatically hide the scrollbar (so the offset
 * doesn't change in such case). Eg: macOS with "Automatically based on mouse".
 */
const SCROLLBAR_WIDTH = OS_SCROLLBAR_WIDTH || 20;

/**
 * Ported from Vitor's SimpleScrollbar library (vanilla JS):
 * https://github.com/buzinas/simple-scrollbar
 * @param {React.ReactNode} content Used as a dependency to re-run the effect
 * @param {React.MutableRefObject} [customRef]
 * @param {Object} [options={}]
 * @param {boolean} [options.disabled]
 */
export default function useCustomScroller(
  content,
  { disabled } = {},
) {
  // const [scrollRatio, setScrollRatio] = useState(1);
  const [isDraggingTrack, setIsDraggingTrack] = useState(false);
  const [scrollerRef, setScrollerRef] = useState(null);

  const measuredScrollerRef = useCallback(node => {
    if (node !== null) {
      setScrollerRef(node);
    }
  }, []);

  const trackRef = useRef();
  const trackAnimationRef = useRef();

  useLayoutEffect(() => {
    if (!disabled) return;
    const el = scrollerRef;

    const onWheel = e => e.preventDefault();
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [scrollerRef, disabled]);

  const onScroll = useCallback(() => {
    if (!scrollerRef) return;
    const { clientHeight, scrollHeight } = scrollerRef;
    const scrollRatio = clientHeight/scrollHeight;
    if (scrollRatio === 1) return;
    const el = scrollerRef;
    const track = trackRef.current;

    cancelAnimationFrame(trackAnimationRef.current);

    trackAnimationRef.current = requestAnimationFrame(() => {
      const { clientHeight, scrollHeight } = scrollerRef;
      const trackHeight = trackRef.current.clientHeight;
      const ratio = el.scrollTop / (scrollHeight - clientHeight);
      const y = ratio * (clientHeight - trackHeight);
      track.style.transform = `translateY(${y}px)`;
      track.style.height = `${(clientHeight/scrollHeight)*100}%`
    });
  }, [scrollerRef]);

  const moveTrack = useCallback(
    e => {
      e.preventDefault();
      const el = scrollerRef;
      let moveAnimation;
      let lastPageY = e.pageY;
      let lastScrollTop = el.scrollTop;

      setIsDraggingTrack(true);

      const drag = ({ pageY }) => {
        cancelAnimationFrame(moveAnimation);
        moveAnimation = requestAnimationFrame(() => {
          const { clientHeight, scrollHeight } = scrollerRef;
          const scrollRatio = clientHeight/scrollHeight;
          const delta = pageY - lastPageY;
          lastScrollTop += delta / scrollRatio;
          lastPageY = pageY;
          el.scrollTop = lastScrollTop;
        });
      };

      const stop = () => {
        setIsDraggingTrack(false);
        window.removeEventListener('mousemove', drag);
      };

      window.addEventListener('mousemove', drag);
      window.addEventListener('mouseup', stop, { once: true });
    },
    [scrollerRef],
  );

  const updateTrack = () => {
    cancelAnimationFrame(trackAnimationRef.current);

    trackAnimationRef.current = requestAnimationFrame(() => {
      const { clientHeight, scrollHeight, scrollTop } = scrollerRef || {};
      const scrollRatio = clientHeight/scrollHeight;
      const trackHeight = trackRef.current.clientHeight;
      const ratio = scrollTop / (scrollHeight - clientHeight);
      const y = ratio * (clientHeight - trackHeight);
      trackRef.current.style.transform = `translateY(${y}px)`;
      trackRef.current.style.height = `${scrollRatio * 100}%`
    })
  }

  const scrollerProps = {
    ref: measuredScrollerRef,
    onScroll: disabled ? undefined : onScroll,
    onClick: updateTrack
  };

  const { clientHeight, scrollHeight } = scrollerRef || {};
  const scrollRatio = clientHeight/scrollHeight;

  const trackProps = {
    ref: trackRef,
    onMouseDown: disabled ? undefined : moveTrack,
    style: {
      height: `${scrollRatio * 100}%`,
      opacity: isDraggingTrack ? 1 : undefined,
      display: disabled || scrollRatio === 1 ? 'none' : undefined,
    },
  };
  return [scrollerProps, trackProps];
}
