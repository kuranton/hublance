import {useState, useEffect, useRef} from 'react'
import style from './Input.module.css'

const Input = ({className, textarea = false, defaultValue = '', onSubmit, prefix = '', ...props}) => {
  const input = useRef(null)
  const [value, setValue] = useState(defaultValue)
  const Tag = textarea ? 'textarea' : 'input'

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
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

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return(
    <div className={`${textarea ? style.textarea : style.input} ${className ? className : ''}`} onClick={() => input.current.focus()}>
      {prefix ?
        <span className={style.prefix}>{prefix}</span>
      : null}
      <Tag
        ref={input}
        {...props}
        className={style.field}
        onChange={(e) => setValue(e.target.value)}
        onBlur={submit}
        onKeyPress={handleKeyPress}
        value={value}
      />
    </div>
  )
}

export default Input
