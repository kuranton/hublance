import {useState, useRef, useLayoutEffect} from 'react'
import style from './Badge.module.css'

const Badge = ({className, remove, children}) => {
  const measure = useRef({})
  const [disappearing, setDisappearing] = useState(false)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    setWidth(measure.current.getBoundingClientRect().width + 4) // 4 is margin
  }, [measure])

  const onAnimationEnd = () => {
    if (disappearing) {
      remove()
    }
  }


  return(
    <div className={style.wrap} style={{width: disappearing ? 0 : width}}>
      <span className={className} onAnimationEnd={onAnimationEnd} style={{animationName: disappearing ? style.disappear : style.appear}}>
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
