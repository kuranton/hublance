import {useState} from 'react'
import {useDispatch} from 'react-redux'

import style from './Join.module.css'

import {hide, start} from '@store/signupSlice'

import UserPic from '@components/UserPic/UserPic'

const actions = {hide, start}

const Join = ({setOffset}) => {
  const [fading, setFading] = useState(false)
  const [actionName, setActionName] = useState('')
  const dispatch = useDispatch()

  const onJoin = () => {
    setActionName('start')
    setFading(true)
    setOffset(316)
  }

  const onClose = () => {
    setActionName('hide')
    setFading(true)
    setOffset(-1)
  }

  return(
    <li className={style.wrap} onAnimationEnd={() => dispatch(actions[actionName]())} style={fading ? {animationName: style.disappear} : {}}>
      <UserPic/>
      <h2 className={style.title}>Join to our list!</h2>
      <button className={style.btnJoin} onClick={onJoin}>Join Us</button>
      <button className={style.btnClose} onClick={onClose}>Close</button>
    </li>
  )
}


export default Join
