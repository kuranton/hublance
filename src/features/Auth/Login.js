import {useSelector, useDispatch} from 'react-redux'
import {setEmail, setPassword, logIn} from '@store/authSlice'
import {startSignup, show} from '@store/profileSlice'

import style from './Auth.module.css'

import {Link, useHistory} from 'react-router-dom'
import Button from '@components/Button'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {email, password} = useSelector(state => state.auth.credentials)
  const error = useSelector(state => state.auth.errors.login)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(logIn())
  }

  const join = () => {
    dispatch(startSignup())
    dispatch(show())
    history.push('/')
  }

  return(
    <div className={style.wrap}>
      <h2 className={style.title}>Login</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <input type='email' className={style.input} value={email} placeholder='Email' onChange={(e) => dispatch(setEmail(e.target.value))}/>
        <input type='password' className={style.input} value={password} placeholder='Password' onChange={(e) => dispatch(setPassword(e.target.value))}/>

        {error &&
          <p className={style.error}>{error}</p>
        }

        <Button type='submit' className={style.submit} primary disabled={!email || !password}>Log In</Button>
        <div className={style.links}>
          <p>Not a member yet? <button type='button' className={style.link} onClick={join}>Join us</button></p>
          <Link to='/password-recovery' className={style.link}>Forgot password?</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
