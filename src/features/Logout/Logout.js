import {useDispatch} from 'react-redux'
import {logOut} from '@store/authSlice'

import style from './Logout.module.css'

import Button from '@components/Button'

const Logout = () => {
  const dispatch = useDispatch()
  return(
    <div className={style.wrap}>
      <h3>Are you sure you want to log out?</h3>
      <Button primary className={style.button} onClick={() => dispatch(logOut())}>Log out</Button>
    </div>
  )
}

export default Logout
