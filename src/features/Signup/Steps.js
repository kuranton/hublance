import {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {setName} from '@store/profileSlice'
import {setPassword, setEmail, signUp} from '@store/authSlice'

import style from './Steps.module.css'

import {isEmail} from 'validator'


const Steps = ({step, setStep, signedUp}) => {
  const [shouldRender, setShouldRender] = useState(step < 3)
  const input = useRef()
  const dispatch = useDispatch()
  const steps = [{
    title: 'Name',
    name: 'name',
    value: useSelector(store => store.profile.data.name),
    action: setName,
    type: 'text'
  }, {
    title: 'Email',
    name: 'email',
    value: useSelector(store => store.auth.credentials.email),
    action: setEmail,
    type: 'email'
  }, {
    title: 'Password',
    name: 'password',
    value: useSelector(store => store.auth.credentials.password),
    action: setPassword,
    type: 'password'
  }]
  const {title, name, value, action} = steps[Math.min(step, 2)]

  useEffect(() => {
    if (input && input.current) {
      input.current.focus()
    }
  }, [])

  useEffect(() => {
    if (signedUp) {
      setStep(3)
    }
  }, [signedUp, setStep])

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
      dispatch(signUp())
    } else {
      setStep(step + 1)
    }
  }
  const forwardDisabled = step !== 1 ? !value : !isEmail(value)

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

      <input ref={input} type={steps[step] ? steps[step].type : 'text'} name={name} placeholder='Type here...' onChange={(e) => dispatch(action(e.target.value))} value={value} className={style.input}/>

      <button type='button' onClick={goForward} onMouseDown={preventOutline} disabled={forwardDisabled} className={style.next}>Next</button>
    </form>
  )
}

export default Steps
