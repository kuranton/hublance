import {useState} from 'react'
import style from './Input.module.css'

const Input = ({className, textarea = false, defaultValue = '', onSubmit, ...props}) => {
  const [value, setValue] = useState(defaultValue)
  const Tag = textarea ? 'textarea' : 'input'

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (textarea && !e.ctrlKey) {
        return
      }
      submit()
    }
  }

  const submit = () => {
    if (typeof onSubmit === 'function') {
      onSubmit(value)
    }
  }

  return(
    <Tag
      {...props}
      className={`${textarea ? style.textarea : style.input} ${className ? className : ''}`}
      onChange={(e) => setValue(e.target.value)}
      onBlur={submit}
      onKeyPress={handleKeyPress}
      value={value}
    />
  )
}

export default Input
