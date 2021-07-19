import {useRef, useState, useEffect} from 'react'

import {Portal} from 'react-portal'

import style from './Tooltip.module.css'

const Tooltip = ({width = 150, scroll = 0, children}) => {
  const wrap = useRef({})
  const timeout = useRef(null)
  const [rect, setRect] = useState({})
  const [visible, setVisible] = useState({})
  const [shouldRender, setRender] = useState(false)

  const [initialScroll, setInitialScroll] = useState(0)

  const handleMouseEnter = () => {
    clearTimeout(timeout.current)
    setRect(wrap.current.getBoundingClientRect())
    setVisible(true)
    setRender(true)
    setInitialScroll(scroll)
  }

  const handleMouseLeave = () => {
    timeout.current = setTimeout(() => setVisible(false), 100)
  }

  const handleAnimationEnd = () => {
    if (!visible) {
      setRender(false)
    }
  }

  useEffect(() => {
    setVisible(false)
  }, [scroll])

  return(
    <div ref={wrap} className={style.wrap} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {shouldRender ?
        <Portal>
          <div
            className={style.tooltipWrap}
            style={{
              top: rect.top + window.pageYOffset,
              left: rect.left + rect.width/2,
              animationName: visible ? style.appear : style.disappear,
              pointerEvents: !visible ? 'none' : null
            }}
            onAnimationEnd={handleAnimationEnd}
          >
            <div
              className={style.tooltip}
              style={{
                width,
                transform: `translateY(${initialScroll - scroll}px)`
              }}
            >
              {children}
            </div>
          </div>
        </Portal>
      : null}
    </div>
  )
}

export default Tooltip
