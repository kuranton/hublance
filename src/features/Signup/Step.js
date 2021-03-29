import {useEffect, useRef} from 'react'
import style from './Step.module.css'

const Step = ({goBack, goForward, backDisabled = false, title, type = 'text', validator, value, onChange}) => {
  const input = useRef()
  useEffect(() => {
    if (input && input.current) {
      input.current.focus()
    }
  }, [])

  const name = title.split(' ').join('-').toLowerCase()
  const preventOutline = (e) => e.preventDefault()

  const handleSubmit = (e) => {
    e.preventDefault()
    goForward()
  }

  const forwardDisabled = !validator(value)

  return(
    <form className={style.form} onSubmit={handleSubmit}>
      <button type='button' onClick={goBack} disabled={backDisabled} className={style.prev}>Prevoius</button>

      <label htmlFor={name} className={style.label}>
        {title}
      </label>
      <input ref={input} type={type} name={name} placeholder='Type here...' onChange={onChange} value={value} className={style.input}/>

      <button type='button' onClick={goForward} onMouseDown={preventOutline} disabled={forwardDisabled} className={style.next}>Next</button>
    </form>
  )
}

export default Step
