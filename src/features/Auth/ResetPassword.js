import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setPassword, resetPassword, setSuccess} from '@store/authSlice'
import {useHistory, useLocation} from 'react-router-dom'
import {validatePassword} from '@util/validatePassword'

import style from './Auth.module.css'

import Button from '@components/Button'

const ResetPassword = () => {
  const [warning, setWarning] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const dispatch = useDispatch()
  const password = useSelector(store => store.auth.credentials.password)
  const success = useSelector(store => store.auth.success.reset)
  const error = useSelector(store => store.auth.errors.reset)
  const location = useLocation()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    const validation = validatePassword(password)
    if (!validation.passes) {
      setWarning(validation.warning)
      setSuggestions(validation.suggestions)
      return
    }
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    const token = params.get('token')
    dispatch(resetPassword({id, token}))
  }

  const handleChange = (e) => {
    if (warning) {
      const validation = validatePassword(e.target.value)
      if (!validation.passes) {
        setWarning(validation.warning)
        setSuggestions(validation.suggestions)
      } else {
        setWarning('')
        setSuggestions([])
      }
    }
    dispatch(setPassword(e.target.value))
  }

  useEffect(() => {
    if (success) {
      dispatch(setSuccess({reset: false}))
      history.push('/login')
    }
  }, [success, dispatch, history])

  return(
    <div className={style.wrap}>
      <h2 className={style.title}>Reset Password</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <input type='password' className={style.input} value={password} placeholder='New Password' onChange={handleChange}/>

        {warning &&
          <p className={style.error}>{warning}</p>
        }

        {suggestions.map(suggestion =>
          <p key={suggestion} className={style.suggestion}>{suggestion}</p>
        )}

        {error &&
          <p className={style.error}>{error}</p>
        }

        <Button type='submit' className={style.submit} primary disabled={!password}>Submit</Button>
      </form>
    </div>
  )
}

export default ResetPassword
