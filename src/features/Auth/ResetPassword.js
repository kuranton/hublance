import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setPassword, resetPassword, setPasswordReset} from '@store/authSlice'
import {useHistory, useLocation} from 'react-router-dom'

import style from './Auth.module.css'

import Button from '@components/Button'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const password = useSelector(store => store.auth.credentials.password)
  const passwordReset = useSelector(store => store.auth.passwordReset)
  const location = useLocation()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    const token = params.get('token')
    dispatch(resetPassword({id, token}))
  }

  useEffect(() => {
    if (passwordReset) {
      dispatch(setPasswordReset(false))
      history.push('/login')
    }
  }, [passwordReset, dispatch, history])

  return(
    <div className={style.wrap}>
      <h2 className={style.title}>Reset Password</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <input type='password' className={style.input} value={password} placeholder='New Password' onChange={(e) => dispatch(setPassword(e.target.value))}/>
        <Button type='submit' className={style.submit} primary disabled={!password}>Submit</Button>
      </form>
    </div>
  )
}

export default ResetPassword
