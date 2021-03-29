import {useSelector, useDispatch} from 'react-redux'
import style from './Header.module.css'

import {show, start} from '@store/signupSlice'
import {edit} from '@store/profileSlice'

import logo from './logo.png'

const Header = () => {
  const dispatch = useDispatch()
  const submitted = useSelector(store => store.signup.submitted)
  const join = () => {
    if (submitted) {
      dispatch(edit())
      dispatch(show())
    } else {
      dispatch(start())
      dispatch(show())
    }
  }
  const preventOutline = (e) => e.preventDefault()
  return(
    <header className={style.header}>
      <h1 className={style.logo}>
        <img src={logo} alt='Hublance' width={162} height={38}/>
        <span>Hublance</span>
      </h1>

      <nav>
        <a href='/' className={style.link}>about</a>
        <button className={style.linkJoin} onMouseDown={preventOutline} onClick={join}>{submitted ? 'view profile' : 'join us'}</button>
      </nav>
    </header>
  )
}

export default Header
