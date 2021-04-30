import {useDispatch} from 'react-redux'

import style from './Join.module.css'

import {hide, start} from '@store/signupSlice'

import UserPic from '@components/UserPic/UserPic'

const Join = () => {
  const dispatch = useDispatch()
  return(
    <li className={style.wrap}>
      <UserPic/>
      <h2 className={style.title}>Join to our list!</h2>
      <button className={style.btnJoin} onClick={() => dispatch(start())}>Join Us</button>
      <button className={style.btnClose} onClick={() => dispatch(hide())}>Close</button>
    </li>
  )
}


export default Join
