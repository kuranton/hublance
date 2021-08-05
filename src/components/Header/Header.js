import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import style from './Header.module.css'

import {edit, show, startSignup} from '@store/profileSlice'

import {Link} from 'react-router-dom'

import logo from './logo.png'

const Header = () => {
  const [updatedText, setUpdatedText] = useState(false)
  const dispatch = useDispatch()
  const submitted = useSelector(store => store.profile.status.signedUp)
  const join = () => {
    if (submitted) {
      dispatch(edit())
      dispatch(show())
    } else {
      dispatch(startSignup())
      dispatch(show())
    }
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
        <Link to='/about' className={style.link} style={{transform: `translateX(${submitted ? -36 : 0}px)`}}>about</Link>
        {!submitted ?
          <Link to='/login' className={style.link} style={{transform: `translateX(${submitted ? -36 : 0}px)`}}>log in</Link>
        : null}
        <button className={style.join} onMouseDown={preventOutline} onClick={join}>
          <span className={style.joinLeft} style={{transform: `translateX(${submitted ? -36 : 0}px)`}}/>
          <span className={style.joinMid} style={{transform: `scaleX(${submitted ? 7.2 : 3.6})`}}/>
          <span className={style.joinRight}/>
          {updatedText ?
            <span className={style.joinText} style={{animationName: style.appear}}>view profile</span>
          :
          <span className={style.joinText} style={submitted ? {animationName: style.disappear} : {}} onAnimationEnd={() => setUpdatedText(true)}>join us</span>
          }
        </button>
      </nav>
    </header>
  )
}

export default Header
