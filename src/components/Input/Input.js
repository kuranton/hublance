import {useState, useEffect, useRef} from 'react'
import style from './Input.module.css'

import {isEmail} from 'validator'

const Input = ({className, textarea = false, defaultValue = '', onSubmit, prefix = '', type = 'text', ...props}) => {
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
      if (type === 'email' && !isEmail(value)) {
        return
      }
      onSubmit(value)
    }
  }

  const updateValue = (val) => {
    if (type === 'number') {
      setValue(val.replace(/[^\d.]/g,''))
    } else {
      setValue(val)
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
        onChange={(e) => updateValue(e.target.value)}
        onBlur={submit}
        onKeyPress={handleKeyPress}
        value={value}
      />
    </div>
  )
}

export default Input
