import {useDispatch} from 'react-redux'
import {logOut} from '@store/authSlice'

import style from './Auth.module.css'

import Button from '@components/Button'

const Logout = () => {
  const dispatch = useDispatch()
  return(
    <div className={style.wrap}>
      <h2 className={style.title}>Log Out</h2>
      <p className={style.message}>Are you sure you want to log out?</p>
      <Button primary style={{marginLeft: 'auto'}} onClick={() => dispatch(logOut())}>Confirm</Button>
    </div>
  )
}

export default Logout
