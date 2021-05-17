import {useState, useEffect} from 'react'
import style from './NoMatches.module.css'

const NoMatches = ({visible}) => {
  const [shouldRender, setRender] = useState(false)

  useEffect(() => {
    if (!visible) {
      setRender(false)
    } else {
      setRender(true)
    }
  }, [visible])

  if (!shouldRender) {
    return null
  }

  return(
    <li className={style.noMatches} style={{animationName: visible ? style.appear : style.disappear}}>No matches</li>
  )
}

export default NoMatches
