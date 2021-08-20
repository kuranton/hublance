import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setTitle} from '@store/profileSlice'

import style from './Title.module.css'

const Title = () => {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()
  const title = useSelector(store => store.profile.data.title)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      e.preventDefault()
      dispatch(setTitle(value))
    }
  }

  useEffect(() => {
    setValue(title)
  }, [title])

  return(
    <div>
      <div className={style.wrap}>
        <textarea
          name='title'
          placeholder='Type job title...'
          className={style.title}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onBlur={() => dispatch(setTitle(value))}
          value={value}
          rows={1}
        />
        <div className={style.stretch} aria-hidden='true'>
          {`${value} `}
        </div>
      </div>
    </div>
  )
}

export default Title
