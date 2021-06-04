import {useState, useEffect} from 'react'
import style from './Popup.module.css'

const Popup = ({visible, children}) => {
  const [shouldRender, setRender] = useState(visible)

  const handleAnimationEnd = () => {
    if (visible) {
      return
    }
    setRender(false)
  }

  useEffect(() => {
    if (visible) {
      setRender(true)
    }
  }, [visible])

  if (!shouldRender) {
    return null
  }

  return(
    <div className={style.popup} style={{animationName: visible ? style.appear : style.disappear}} onAnimationEnd={handleAnimationEnd}>
      {children}
    </div>
  )
}

export default Popup
