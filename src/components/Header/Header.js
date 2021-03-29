import {useDispatch} from 'react-redux'
import style from './Header.module.css'

import {show, start} from '@store/signupSlice'

import logo from './logo.png'

const Header = () => {
  const dispatch = useDispatch()
  const join = () => {
    dispatch(start())
    dispatch(show())
  }
  return(
    <header className={style.header}>
      <h1 className={style.logo}>
        <img src={logo} alt='Hublance' width={162} height={38}/>
        <span>Hublance</span>
      </h1>

      <nav>
        <a href='/' className={style.link}>about</a>
        <button className={style.linkJoin} onClick={join}>join us</button>
      </nav>
    </header>
  )
}

export default Header
