import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import style from './Header.module.css'

import {edit, show, startSignup} from '@store/profileSlice'

import {Link} from 'react-router-dom'

import logo from './logo.png'

const Header = () => {
  const [updatedText, setUpdatedText] = useState(false)
  const dispatch = useDispatch()
  const authenticated = useSelector(store => store.auth.authenticated)
  const history = useHistory()
  const join = () => {
    if (authenticated) {
      dispatch(edit())
      dispatch(show())
    } else {
      dispatch(startSignup())
      dispatch(show())
    }
    history.push('/')
  }
  const preventOutline = (e) => e.preventDefault()
  return(
    <header className={style.header}>
      <Link to='/'>
        <h1 className={style.logo}>
          <img src={logo} alt='Hublance' width={162} height={38}/>
          <span>Hublance</span>
        </h1>
      </Link>

      <nav className={style.nav}>
        <Link to='/about' className={style.link} style={{transform: `translateX(${authenticated ? -36 : 0}px)`}}>about</Link>
        {!authenticated ?
          <Link to='/login' className={style.link} style={{transform: `translateX(${authenticated ? -36 : 0}px)`}}>log in</Link>
        :
        <Link to='/logout' className={style.link} style={{transform: `translateX(${authenticated ? -36 : 0}px)`}}>log out</Link>
        }
        <button className={style.join} onMouseDown={preventOutline} onClick={join}>
          <span className={style.joinLeft} style={{transform: `translateX(${authenticated ? -36 : 0}px)`}}/>
          <span className={style.joinMid} style={{transform: `scaleX(${authenticated ? 7.2 : 3.6})`}}/>
          <span className={style.joinRight}/>
          {updatedText ?
            <span className={style.joinText} style={{animationName: style.appear}}>view profile</span>
          :
          <span className={style.joinText} style={authenticated ? {animationName: style.disappear} : {}} onAnimationEnd={() => setUpdatedText(true)}>join us</span>
          }
        </button>
      </nav>
    </header>
  )
}

export default Header
