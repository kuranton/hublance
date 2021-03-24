import {useRef, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setJob} from './signupSlice'

import style from './Title.module.css'

const Title = () => {
  const input = useRef(null)
  const [focus, setFocus] = useState(false)
  const dispatch = useDispatch()
  const job = useSelector(store => store.signup.job)

  return(
    <div className={style.wrap}>
      <textarea
        name='job'
        placeholder='Type job title...'
        className={style.title}
        onChange={(e) => dispatch(setJob(e.target.value))}
        rows={1}
        value={job}
      />
      <div className={style.stretch} aria-hidden='true'>
        {`${job} `}
      </div>
    </div>
  )
}

export default Title
