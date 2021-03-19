import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import style from './Progress.module.css'

const Progress = () => {
  const signup = useSelector(store => store.signup)
  console.log(signup)
  const percentage = useMemo(() => {
    let total = 0
    let filled = 0
    for (let key in signup) {
      if (typeof signup[key] !== 'boolean') {
        total++
        if ((Array.isArray(signup[key]) && signup[key].length) || (!Array.isArray(signup[key]) && !!signup[key])) {
          filled++
        }
      }
    }
    return Math.round(filled/total*100)
  }, [signup])
  return(
    <div className={style.wrap}>
      <span className={style.label}>
        Profile filled
      </span>
      <div className={style.bar}>
        <div className={style.filled} style={{width: `${percentage}%`}}/>
        <div className={style.caret} style={{left: `calc(${percentage}% - 5.5px)`}}/>
      </div>
      <span className={style.percentage}>
        {percentage}%
      </span>
    </div>
  )
}

export default Progress
