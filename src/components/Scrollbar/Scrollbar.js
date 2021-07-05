import {useCallback} from 'react'
import {useEventListener} from '@util/useEventListener'

import style from './Scrollbar.module.css'

const Scrollbar = ({scroll, setScroll, wrapHeight, contentHeight, maxHeight, dragging, setDragging, ...props}) => {
  const dragStart = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const drag = useCallback((e) => {
    if (!dragging) {
      return
    }
    setScroll(scroll => Math.max(Math.min(contentHeight - maxHeight, scroll + e.movementY*contentHeight/wrapHeight), 0))
  }, [dragging, wrapHeight, contentHeight, maxHeight, setScroll])

  const dragEnd = useCallback(() => {
    if (!dragging) {
      return
    }
    setDragging(false)
  }, [dragging, setDragging])

  useEventListener('mousemove', drag)
  useEventListener('mouseup', dragEnd)

  return(
    <div className={`${style.track} ${wrapHeight >= contentHeight ? style.hidden : ''}`} {...props}>
      <div className={style.scrollbar} style={{transform: `scaleY(${wrapHeight/10})`}}/>
      <div
        onMouseDown={dragStart}
        className={`${style.thumb} ${dragging ? style.dragging : ''}`}
        style={{transform: `translateY(${scroll/contentHeight*wrapHeight}px)`, transition: dragging ? 'none' : null}}
      >
        <div className={style.thumbTop}/>
        <div className={style.thumbMid} style={{transform: `scaleY(${wrapHeight/5 * wrapHeight/contentHeight - 2})`}}/>
        <div className={style.thumbBot} style={{transform: `translateY(${wrapHeight * wrapHeight/contentHeight - 5}px)`}}/>
      </div>
    </div>
  )
}

export default Scrollbar
