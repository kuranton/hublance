import {useSelector} from 'react-redux'
import style from './Header.module.css'

import {Link} from 'react-router-dom'

import logo from './logo.png'

const Header = () => {
  const authenticated = useSelector(store => store.auth.authenticated)

  return(
    <header className={style.header}>
      <Link to='/'>
        <h1 className={style.logo}>
          <img src={logo} alt='Hublance' width={162} height={38}/>
          <span>Hublance</span>
        </h1>
      </Link>

      <nav className={style.nav}>
        <Link to='/about' className={style.link}>about</Link>
        {!authenticated ?
          <Link to='/login' className={style.authLink}>log in</Link>
        :
        <Link to='/logout' className={style.authLink}>log out</Link>
        }
      </nav>
    </header>
  )
}

export default Header
