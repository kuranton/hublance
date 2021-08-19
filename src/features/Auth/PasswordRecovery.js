import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setEmail, requestPasswordRecovery, setRecoveryRequested} from '@store/authSlice'

import style from './Auth.module.css'

import {Link} from 'react-router-dom'
import Button from '@components/Button'

const PasswordRecovery = () => {
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch()
  const email = useSelector(store => store.auth.credentials.email)
  const recoveryRequested = useSelector(store => store.auth.recoveryRequested)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(requestPasswordRecovery())
  }

  useEffect(() => {
    if (recoveryRequested) {
      dispatch(setRecoveryRequested(false))
      setSuccess(true)
    }
  }, [dispatch, recoveryRequested])

  return(
    <div className={style.wrap}>
      <h2 className={style.title}>Password Recovery</h2>
      {success ?
        <p className={style.message}>Check your email for recovery link.</p>
      :
      <form className={style.form} onSubmit={handleSubmit}>
        <input type='email' className={style.input} value={email} placeholder='Email' onChange={(e) => dispatch(setEmail(e.target.value))}/>
        <div className={style.links}>
          <p>Return to <Link to='/login' className={style.link}>Login</Link></p>
          <Button type='submit' className={style.submit} primary disabled={!email} style={{marginBottom: 0}}>Submit</Button>
        </div>
      </form>
      }
    </div>
  )
}

export default PasswordRecovery
