import {useState, useEffect, useRef, useMemo} from 'react'
import style from './Slider.module.css'

const Slider = ({title, filled, onChange, className}) => {
  const line = useRef({})
  const [dragging, setDragging] = useState(false)
  const [rect, setRect] = useState(null)

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
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', dragEnd)
  }
  const drag = (e) => {
    if (!dragging) {
      return
    }
    if (typeof onChange === 'function') {
      const addFilled = e.movementX/rect.width
      onChange(Math.min(Math.max(0, filled + addFilled), 1))
    }
  }
  const dragEnd = () => {
    if (!dragging) {
      return
    }
    setDragging(dragging => dragging = false)
  }

  useEffect(() => {
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', dragEnd)
    document.addEventListener('mouseleave', dragEnd)
    return () => {
      document.removeEventListener('mousemove', drag)
      document.removeEventListener('mouseup', dragEnd)
      document.removeEventListener('mouseleave', dragEnd)
    }
  }, [dragging, drag, dragEnd])

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
