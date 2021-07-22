import {useState} from 'react'
import {useDispatch} from 'react-redux'

import {unsetWidth} from '@store/filtersSlice'

import style from './Badge.module.css'

const Badge = ({className, remove, transform, index = 0, type, children}) => {
  const dispatch = useDispatch()
  const [disappearing, setDisappearing] = useState(false)

  const onAnimationEnd = () => {
    if (disappearing) {
      remove()
    }
  }

  const handleClick = () => {
    dispatch(unsetWidth({type, index}))
    setDisappearing(true)
  }

  return(
    <div className={style.wrap} style={{transform}}>
      <span className={`${className} ${style.badge}`} onAnimationEnd={onAnimationEnd} style={{animationName: disappearing ? style.disappear : style.appear}}>
        {children}
        <button className={style.remove} onClick={handleClick}>Remove</button>
      </span>
    </div>
  )
}

export default Badge
