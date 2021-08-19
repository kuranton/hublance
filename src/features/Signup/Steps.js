import {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {validatePassword} from '@util/validatePassword'

import {setName} from '@store/profileSlice'
import {setPassword, setEmail, signUp, setError} from '@store/authSlice'

import style from './Steps.module.css'

import {isEmail} from 'validator'


const Steps = ({step, setStep, signedUp}) => {
  const [warning, setWarningState] = useState('')
  const [shouldRender, setShouldRender] = useState(step < 3)
  const input = useRef()
  const dispatch = useDispatch()

  const setWarning = (value) => {
    dispatch(setError({signup: ''}))
    setWarningState(value)
  }

  const changePassword = (e) => {
    if (warning) {
      const validation = validatePassword(steps[step].value)
      if (!validation.passes) {
        setWarning(`${validation.warning}. ${validation.suggestions.join(' ')}}`)
      } else {
        setWarning('')
      }
    }
    dispatch(setPassword(e.target.value))
  }

  const steps = [{
    title: 'Name',
    name: 'name',
    value: useSelector(store => store.profile.data.name),
    onChange: (e) => dispatch(setName(e.target.value)),
    type: 'text'
  }, {
    title: 'Email',
    name: 'email',
    value: useSelector(store => store.auth.credentials.email),
    onChange: (e) => dispatch(setEmail(e.target.value)),
    type: 'email'
  }, {
    title: 'Password',
    name: 'password',
    value: useSelector(store => store.auth.credentials.password),
    onChange: changePassword,
    type: 'password'
  }]
  const {title, name, value, onChange} = steps[Math.min(step, 2)]

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
      const validation = validatePassword(steps[step].value)
      if (!validation.passes) {
        const warning = `${validation.warning}. ${validation.suggestions.join(' ')}}`
        setWarning(warning)
        return
      }
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

      {warning &&
        <p className={style.warning}>{warning}</p>
      }

      <input ref={input} type={steps[step] ? steps[step].type : 'text'} name={name} placeholder='Type here...' onChange={onChange} value={value} className={style.input}/>

      <button type='button' onClick={goForward} onMouseDown={preventOutline} disabled={forwardDisabled} className={style.next}>Next</button>
    </form>
  )
}

export default Steps
