import {useSelector, useDispatch} from 'react-redux'
import {setEmail, setPassword, logIn} from '@store/profileSlice'

import style from './Login.module.css'

import Button from '@components/Button'

const Login = () => {
  const dispatch = useDispatch()
  const {email, password} = useSelector(state => state.profile.data)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(logIn())
  }

  return(
    <div className={style.wrap} onSubmit={handleSubmit}>
      <form className={style.form}>
        <input type='email' className={style.input} value={email} placeholder='Email' onChange={(e) => dispatch(setEmail(e.target.value))}/>
        <input type='password' className={style.input} value={password} placeholder='Password' onChange={(e) => dispatch(setPassword(e.target.value))}/>
        <Button type='submit' className={style.submit} primary>Log In</Button>
      </form>
    </div>
  )
}

export default Login
