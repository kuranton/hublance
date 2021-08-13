import {useSelector, useDispatch} from 'react-redux'
import {setEmail, setPassword, logIn} from '@store/authSlice'

import style from './Login.module.css'

import Button from '@components/Button'

const Login = () => {
  const dispatch = useDispatch()
  const {email, password} = useSelector(state => state.auth.credentials)
  const error = useSelector(state => state.auth.errors.login)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(logIn())
  }

  return(
    <div className={style.wrap} onSubmit={handleSubmit}>
      <form className={style.form}>
        <input type='email' className={style.input} value={email} placeholder='Email' onChange={(e) => dispatch(setEmail(e.target.value))}/>
        <input type='password' className={style.input} value={password} placeholder='Password' onChange={(e) => dispatch(setPassword(e.target.value))}/>

        {error &&
          <p className={style.error}>{error}</p>
        }

        <Button type='submit' className={style.submit} primary={!!email && !!password} disabled={!email || !password}>Log In</Button>
      </form>
    </div>
  )
}

export default Login
