import {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setName, setJob, setEmail} from '@store/profileSlice'
import {submit} from '@store/signupSlice'

import style from './Steps.module.css'

import {isEmail} from 'validator'


const Steps = ({step, setStep}) => {
  const [shouldRender, setShouldRender] = useState(step < 3)
  const input = useRef()
  const dispatch = useDispatch()
  const steps = [{
    title: 'Name',
    name: 'name',
    value: useSelector(store => store.profile.name),
    action: setName
  }, {
    title: 'Job Title',
    name: 'job-title',
    value: useSelector(store => store.profile.job),
    action: setJob
  }, {
    title: 'Email',
    name: 'email',
    value: useSelector(store => store.profile.email),
    action: setEmail
  }]
  const {title, name, value, action} = steps[Math.min(step, 2)]

  useEffect(() => {
    if (input && input.current) {
      input.current.focus()
    }
  }, [])

  const preventOutline = (e) => e.preventDefault()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!forwardDisabled) {
      goForward()
    }
  }
  const goForward = () => {
    if (step > 2) {
      return
    }
    if (step === 2) {
      dispatch(submit())
    }
    setStep(step + 1)
  }
  const forwardDisabled = step !== 2 ? !value : !isEmail(value)

  const onAnimationEnd = () => {
    if (step > 2) {
      setShouldRender(false)
    }
  }

  if (!shouldRender) {
    return null
  }

  return(
    <form className={style.form} onSubmit={handleSubmit} onAnimationEnd={onAnimationEnd} style={step > 2 ? {animation: `${style.fadeOut} 300ms`} : {}}>
      <button type='button' onClick={() => setStep(step - 1)} onMouseDown={preventOutline} disabled={step < 1} className={style.prev}>Prevoius</button>

      <label htmlFor={name} className={style.label}>
        {title}
      </label>

      <input ref={input} type={step !== 2 ? 'text' : 'email'} name={name} placeholder='Type here...' onChange={(e) => dispatch(action(e.target.value))} value={value} className={style.input}/>

      <button type='button' onClick={goForward} onMouseDown={preventOutline} disabled={forwardDisabled} className={style.next}>Next</button>
    </form>
  )
}

export default Steps
