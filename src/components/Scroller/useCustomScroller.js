import { useLayoutEffect, useRef, useState, useCallback } from 'react';

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
