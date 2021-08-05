import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import style from './Progress.module.css'

import Squares from './Squares'
import Badge from './Badge'

const barWidth = 180

const Progress = () => {
  const profile = useSelector(store => store.profile)
  const progress = useMemo(() => {
    let total = 0
    let filled = 0
    for (let key in profile.data) {
      if (typeof profile.data[key] !== 'boolean') {
        total++
        if ((Array.isArray(profile.data[key]) && profile.data[key].length) || (!Array.isArray(profile.data[key]) && !!profile.data[key])) {
          filled++
        }
      }
    }
    return filled/total
  }, [profile])

  const percentage = Math.round(progress*100)
  const complete = progress === 1

  let caretTransform = `translateX(${Math.round(progress * barWidth)}px) scale(${progress * 0.8 + 0.2}, ${progress * 0.8 + 0.2})`
  if (complete) {
    caretTransform = `translateX(${0.53 * barWidth}px)`
  }

  return(
    <div className={`${style.wrap} ${complete ? style.complete : ''}`}>
      <Squares complete={complete}/>
      <span className={style.label}>
        Profile filled
      </span>
      <div className={style.bar}>
        <div className={style.filled} style={{width: `${percentage}%`}}/>
        <div className={style.caret} style={{transform: caretTransform}}>
          <Badge complete={complete}/>
        </div>
      </div>
      <span className={style.percentage}>
        {percentage}%
      </span>
    </div>
  )
}

export default Progress
