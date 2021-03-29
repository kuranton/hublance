import {useState, useEffect, useRef, useMemo, useCallback} from 'react'
import {useEventListener} from '@util/useEventListener'

import style from './Slider.module.css'

const Slider = ({title, filled, onChange, className}) => {
  const line = useRef({})
  const [dragging, setDragging] = useState(false)
  const [rect, setRect] = useState({})

  useEffect(() => {
    setRect(line.current.getBoundingClientRect())
  },[])

  const position = useMemo(() => {
    const {width} = rect || 0
    return filled * width
  }, [rect, filled])

  const dragStart = (e) => {
    e.preventDefault()
    setDragging(true)
    setRect(line.current.getBoundingClientRect())
  }

  const drag = useCallback(({movementX}) => {
    if (!dragging) {
      return
    }
    if (typeof onChange === 'function') {
      const addFilled = movementX/rect.width
      onChange(Math.min(Math.max(0, filled + addFilled), 1))
    }
  }, [dragging, filled, onChange, rect.width])

  const dragEnd = useCallback(() => {
    if (!dragging) {
      return
    }
    setDragging(dragging => dragging = false)
  }, [setDragging, dragging])

  useEventListener('mousemove', drag, document)
  useEventListener('mouseup', dragEnd, document)
  useEventListener('mouseleave', dragEnd, document)

  return(
    <div className={className}>
      <span className={style.title}>{title}</span>
      <div ref={line} className={style.line}>
        <div className={style.filled} style={{width: `${filled * 100}%`}}/>
        <div className={style.caret} onMouseDown={dragStart} style={{transform: `translateX(${position}px)`}}/>
      </div>
    </div>
  )
}

export default Slider
