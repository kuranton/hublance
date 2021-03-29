import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setJob} from '@store/profileSlice'

import style from './Title.module.css'

const Title = () => {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()
  const job = useSelector(store => store.profile.job)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      e.preventDefault()
      dispatch(setJob(value))
    }
  }

  useEffect(() => {
    setValue(job)
  }, [job])

  return(
    <div className={style.wrap}>
      <textarea
        name='job'
        placeholder='Type job title...'
        className={style.title}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        onBlur={() => dispatch(setJob(value))}
        value={value}
        rows={1}
      />
      <div className={style.stretch} aria-hidden='true'>
        {`${value} `}
      </div>
    </div>
  )
}

export default Title
