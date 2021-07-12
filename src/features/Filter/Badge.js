import {useState, useRef, useLayoutEffect} from 'react'
import style from './Badge.module.css'

import {getTextWidth} from '@util/getTextWidth'

const Badge = ({className, remove, children}) => {
  const measure = useRef({})
  const [disappearing, setDisappearing] = useState(false)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    setWidth(getTextWidth(children, '500 14px ProximaSoft') + 39) // 4 margin + 15px close button + 20px padding and border
  }, [children, setWidth])

  const onAnimationEnd = () => {
    if (disappearing) {
      remove()
    }
  }


  return(
    <div className={style.wrap} style={{width: disappearing ? 0 : width}}>
      <span className={className} onAnimationEnd={onAnimationEnd} style={width ? {animationName: disappearing ? style.disappear : style.appear} : {}}>
        {children}
        <button className={style.remove} onClick={() => setDisappearing(true)}>Remove</button>
      </span>
      <span ref={measure} className={style.measure}>
        {children}
        <button className={style.remove}/>
      </span>
    </div>
  )
}

export default Badge
