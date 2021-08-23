import {useState, useEffect, useRef} from 'react'
import style from './Input.module.css'

const Input = ({className, textarea = false, defaultValue = '', onSubmit, onChange, prefix = '', type = 'text', ...props}) => {
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

  const updateValue = (val) => {
    if (typeof onChange === 'function') {
      onChange(val)
      return
    }
    if (type === 'number') {
      setValue(val.replace(/[^\d.]/g,''))
    } else {
      setValue(val)
    }
  }

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const inputType = type === 'email' || type === 'password' ? type : 'text'

  return(
    <div className={`${textarea ? style.textarea : style.input} ${className ? className : ''}`} onClick={() => input.current.focus()}>
      {prefix ?
        <span className={style.prefix}>{prefix}</span>
      : null}
      <Tag
        type={inputType}
        ref={input}
        {...props}
        className={style.field}
        onChange={(e) => updateValue(e.target.value)}
        onBlur={submit}
        onKeyPress={handleKeyPress}
        value={typeof onChange === 'function' ? defaultValue : value}
      />
    </div>
  )
}

export default Input
